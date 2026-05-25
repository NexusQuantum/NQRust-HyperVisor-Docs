# Deploying `hypervisor.nexusquantum.id`

This box (`nexusdemo`) serves the marketing landing, the Docusaurus docs, and reverse-proxies the `/dashboard/*` demo to Vercel — all from one Caddy site block. The demo itself ships from the hypervisor repo on Vercel; landing + docs ship from this repo.

## Topology

| URL | Origin | Notes |
| --- | --- | --- |
| `https://hypervisor.nexusquantum.id/` | Docusaurus build → `/var/www/nqrust/hypervisor-docs/index.html` | Marketing landing (`src/pages/index.js`) |
| `https://hypervisor.nexusquantum.id/docs/...` | Docusaurus build → `/var/www/nqrust/hypervisor-docs/docs/...` | Versioned docs (`docs/` tree in this repo) |
| `https://hypervisor.nexusquantum.id/dashboard/...` | Reverse-proxy → `https://nqrust-hv-demo.vercel.app/dashboard/...` | Demo, follows hypervisor releases |

## Caddyfile

Save as `/etc/caddy/Caddyfile`:

```caddy
# SERVICE 1: MicroVM Documentation (Port 80)
:80 {
    root * /var/www/docs
    file_server
    try_files {path} /index.html
}

# SERVICE 2: Hypervisor — landing at /, docs at /docs/*, /dashboard/* -> Vercel demo
hypervisor.nexusquantum.id, :81 {
    encode zstd gzip

    # /dashboard/* -> Vercel-hosted demo
    handle /dashboard* {
        reverse_proxy https://nqrust-hv-demo.vercel.app {
            header_up Host nqrust-hv-demo.vercel.app
            header_up X-Forwarded-Host {host}
            header_up X-Forwarded-Proto {scheme}
            transport http {
                tls
                tls_server_name nqrust-hv-demo.vercel.app
            }
        }
    }

    # Everything else -> the Docusaurus build (landing at /, docs at /docs/*)
    handle {
        root * /var/www/nqrust/hypervisor-docs
        try_files {path} {path}/ /index.html
        file_server
    }
}

# SERVICE 3: NQRust Billing
billing.nexusquantum.id {
    reverse_proxy localhost:13300
    encode gzip
}
```

## Reload procedure

```bash
# 1. Validate syntax before touching the running config
sudo caddy validate --config /etc/caddy/Caddyfile

# 2. Hot-reload (zero downtime)
sudo systemctl reload caddy

# 3. Tail logs if anything looks off
sudo journalctl -u caddy -n 200 --no-pager
```

## Smoke test

After reload — and after a new docs build has been rsync'd into `/var/www/nqrust/hypervisor-docs/` — confirm all three paths:

```bash
curl -sI https://hypervisor.nexusquantum.id/                 # 200, text/html (landing)
curl -sI https://hypervisor.nexusquantum.id/docs/            # 200, text/html (docs root)
curl -sIL https://hypervisor.nexusquantum.id/dashboard/      # 307 -> /dashboard/login/, then 200
```

If `/dashboard/` returns Vercel's generic 404, the `Host` header rewrite or `tls_server_name` is missing — Vercel's edge routes deployments by Host + SNI.

## Build & rsync the docs

From the `NQRust-HyperVisor-Docs` repo:

```bash
yarn install
yarn build
rsync -av --delete build/ shirologic@nexusdemo:/var/www/nqrust/hypervisor-docs/
```

`yarn build` runs `docusaurus build` which writes the full site (landing `index.html` + `docs/` subtree + static assets) into `build/`. The `--delete` flag removes stale files from prior deploys.

## What changed vs. the old setup

The previous block redirected `/` → `/docs/` and used `handle_path /docs/*` to strip the prefix before serving Docusaurus. That's no longer needed because:

- Docusaurus is now configured with `baseUrl: '/'` and the docs preset uses `routeBasePath: 'docs'`, so the build directly emits `/index.html` (landing) and `/docs/.../index.html` (docs) from one tree.
- A single `root` + `file_server` serves both.
- `/dashboard/` is new — it didn't exist before because the demo was Vercel-only without a public alias on this domain.

## Vercel side (no changes needed)

The Vercel project (`nqrust-hv-demo`) keeps its existing config:

- Framework: Next.js
- `NEXT_PUBLIC_DEMO_MODE=true` env
- SSO / password protection: **off** (we toggled that earlier via the project API)
- `/` → `/dashboard/` redirect inside `vercel.json`

Releases tagged `v*.*.*` on the hypervisor repo trigger `.github/workflows/deploy-demo.yml`, which builds and deploys to Vercel automatically. The VM never needs to know about a hypervisor release — Caddy keeps proxying to the same Vercel hostname, and Vercel serves whatever the latest deployment is.
