---
sidebar_position: 1
sidebar_label: Ringkasan
slug: /
title: "Ringkasan NQRust HyperVisor"
keywords:
  - NQRust
  - HyperVisor
  - Hyperconverged Infrastructure
description: NQRust HyperVisor adalah platform hyper-converged infrastructure (HCI) yang dilisensikan secara komersial dan dibangun di atas Kubernetes.
---

# Ringkasan NQRust HyperVisor

NQRust HyperVisor adalah platform [hyper-converged infrastructure (HCI)](https://id.wikipedia.org/wiki/Infrastruktur_hiperkonvergen) komersial yang dibangun di atas Kubernetes. Platform ini berjalan langsung di atas perangkat keras bare-metal dan menyatukan komputasi (VM), penyimpanan, jaringan, pencadangan, dan pemantauan dalam satu antarmuka.

## Apa yang Anda dapatkan

- **Manajemen VM penuh** — buat, kloning, migrasi langsung, snapshot, cadangkan, dan jadikan VM sebagai template. Hotplug CPU dan memori, akses konsol VNC langsung dari peramban.
- **Jaringan terdefinisi perangkat lunak** — konfigurasi VLAN, VPC, Network Policy, Load Balancer, dan IP Pool dari satu dasbor.
- **Penyimpanan terdistribusi** — manajemen volume berbasis Longhorn dengan snapshot, kloning, ekspor sebagai image, dan ekspansi yang dapat dibatalkan.
- **Pencadangan & snapshot** — jadwalkan pencadangan VM berulang dan kelola snapshot per resource.
- **Pemantauan & logging** — Grafana tertanam, AlertManager, dan pipeline log berbasis Fluent (Flows & Outputs).
- **Multi-tenan** — namespace dengan RBAC, kuota, dan secret tersendiri per tim.
- **Air-gapped friendly** — instalasi dari ISO yang ditandatangani, pemeriksaan lisensi offline dengan file `.lic`, mirror registry lokal.

:::info Catatan
Sebagian besar halaman dokumentasi saat ini hanya tersedia dalam bahasa Inggris. Halaman yang belum diterjemahkan akan menampilkan teks bahasa Inggris sebagai cadangan. Versi bahasa Indonesia sedang dikembangkan.
:::

## Pelajari lebih lanjut

- [Coba demo langsung](/dashboard/) — masuk dengan `admin / admin`
- [Instalasi (English)](./getting-started/) — instruksi instalasi
- [Hubungi tim](mailto:contact@nexusquantum.id) — untuk lisensi dan dukungan
