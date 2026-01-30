# Image Migration Script - Phase 2
# Consolidates versioned images into unified structure

param(
    [switch]$DryRun
)

$ErrorActionPreference = "Continue"
$projectRoot = Split-Path -Parent $PSScriptRoot

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Image Migration Script - Phase 2" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

if ($DryRun) {
    Write-Host "DRY RUN MODE - No changes will be made`n" -ForegroundColor Yellow
}

# Statistics
$stats = @{
    TotalReferences = 0
    VersionedReferences = 0
    FilesUpdated = 0
    ImagesMoved = 0
}

# Step 1: Find all versioned image references
Write-Host "Step 1: Scanning for versioned image references..." -ForegroundColor Green

$docsPath = Join-Path $projectRoot "docs"
$versionedDocsPath = Join-Path $projectRoot "versioned_docs"

$allMdFiles = @()
$allMdFiles += Get-ChildItem -Path $docsPath -Recurse -Include "*.md","*.mdx" -ErrorAction SilentlyContinue
$allMdFiles += Get-ChildItem -Path $versionedDocsPath -Recurse -Include "*.md","*.mdx" -ErrorAction SilentlyContinue

Write-Host "Found $($allMdFiles.Count) markdown files to scan`n"

# Step 2: Build replacement map
Write-Host "Step 2: Building replacement map..." -ForegroundColor Green

$replacements = @{}

foreach ($file in $allMdFiles) {
    $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
    if (-not $content) { continue }
    
    # Find all image references with version pattern: /img/v1.x/...
    $matches = [regex]::Matches($content, '/img/(v\d+\.\d+)/([^)"\s]+)')
    
    foreach ($match in $matches) {
        $oldPath = $match.Value
        $version = $match.Groups[1].Value
        $relativePath = $match.Groups[2].Value
        $newPath = "/img/$relativePath"
        
        $stats.TotalReferences++
        
        if ($oldPath -ne $newPath) {
            $replacements[$oldPath] = $newPath
            $stats.VersionedReferences++
        }
    }
}

Write-Host "Found $($stats.TotalReferences) total image references"
Write-Host "Found $($stats.VersionedReferences) versioned references to update`n"

if ($replacements.Count -eq 0) {
    Write-Host "No versioned images found. Nothing to do!" -ForegroundColor Yellow
    exit 0
}

# Step 3: Show sample replacements
Write-Host "Step 3: Sample replacements (first 10):" -ForegroundColor Green
$replacements.GetEnumerator() | Select-Object -First 10 | ForEach-Object {
    Write-Host "  $($_.Key) -> $($_.Value)"
}
Write-Host ""

# Step 4: Update markdown files
Write-Host "Step 4: Updating markdown files..." -ForegroundColor Green

foreach ($file in $allMdFiles) {
    $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
    if (-not $content) { continue }
    
    $originalContent = $content
    $updated = $false
    
    foreach ($oldPath in $replacements.Keys) {
        $newPath = $replacements[$oldPath]
        
        if ($content -match [regex]::Escape($oldPath)) {
            $content = $content -replace [regex]::Escape($oldPath), $newPath
            $updated = $true
        }
    }
    
    if ($updated) {
        if ($DryRun) {
            Write-Host "  [DRY RUN] Would update: $($file.FullName)" -ForegroundColor Cyan
        } else {
            Set-Content -Path $file.FullName -Value $content -NoNewline -Encoding UTF8
            Write-Host "  Updated: $($file.Name)" -ForegroundColor Green
        }
        $stats.FilesUpdated++
    }
}

Write-Host ""

# Step 5: Move image files
Write-Host "Step 5: Moving image files..." -ForegroundColor Green

$staticImgPath = Join-Path $projectRoot "static\img"
$movedImages = @{}

foreach ($oldPath in $replacements.Keys) {
    $newPath = $replacements[$oldPath]
    
    # Convert URL paths to file system paths
    $oldFile = Join-Path $staticImgPath ($oldPath -replace '^/img/', '' -replace '/', '\')
    $newFile = Join-Path $staticImgPath ($newPath -replace '^/img/', '' -replace '/', '\')
    
    if (-not (Test-Path $oldFile)) {
        continue
    }
    
    if (Test-Path $newFile) {
        # Check if files are identical
        $oldHash = (Get-FileHash $oldFile -Algorithm MD5).Hash
        $newHash = (Get-FileHash $newFile -Algorithm MD5).Hash
        
        if ($oldHash -eq $newHash) {
            continue
        } else {
            Write-Host "  Warning: Different file exists at $newFile" -ForegroundColor Yellow
            continue
        }
    }
    
    # Create destination directory
    $newDir = Split-Path $newFile
    if (-not (Test-Path $newDir)) {
        if ($DryRun) {
            Write-Host "  [DRY RUN] Would create: $newDir" -ForegroundColor Cyan
        } else {
            New-Item -ItemType Directory -Path $newDir -Force | Out-Null
        }
    }
    
    # Copy file
    if ($DryRun) {
        Write-Host "  [DRY RUN] Would copy: $oldFile -> $newFile" -ForegroundColor Cyan
    } else {
        Copy-Item -Path $oldFile -Destination $newFile -Force
        Write-Host "  Copied: $(Split-Path $oldFile -Leaf)" -ForegroundColor Green
    }
    
    $movedImages[$oldFile] = $newFile
    $stats.ImagesMoved++
}

Write-Host ""

# Step 6: Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Migration Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Total image references:        $($stats.TotalReferences)"
Write-Host "Versioned references found:    $($stats.VersionedReferences)"
Write-Host "Markdown files updated:        $($stats.FilesUpdated)"
Write-Host "Image files moved:             $($stats.ImagesMoved)"
Write-Host "========================================`n" -ForegroundColor Cyan

if ($DryRun) {
    Write-Host "This was a DRY RUN. No changes were made." -ForegroundColor Yellow
    Write-Host "Run without -DryRun to execute the migration.`n" -ForegroundColor Yellow
} else {
    Write-Host "Migration complete!" -ForegroundColor Green
    Write-Host "`nNext steps:" -ForegroundColor Cyan
    Write-Host "1. Test the build: yarn build"
    Write-Host "2. Review changes: git diff"
    Write-Host "3. Commit: git add . && git commit -m 'refactor: consolidate versioned images'"
    Write-Host ""
}
