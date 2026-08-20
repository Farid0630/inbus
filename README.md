# Inbus Solusi Bisnis — Website

Website company profile & katalog ekspor untuk produk turunan kelapa
(Charcoal Briquette, Coconut Shell Charcoal, Semi Husked Coconut) dari
Makassar. Dibangun dengan Next.js 16 (App Router) + React 19 +
TypeScript + Tailwind CSS v4, dengan dukungan 4 bahasa (Indonesia,
English, Arabic, Chinese) via `next-intl`.

## ⚠️ Sebelum go-live: ganti data placeholder

Semua data perusahaan saat ini adalah **placeholder** dan harus diganti
dengan data asli sebelum website di-publish. Cukup edit satu file ini:

```
src/lib/site-config.ts
```

Isinya: nama perusahaan, alamat, nomor WhatsApp, email, telepon,
media sosial, kapasitas produksi, dan daftar sertifikasi. Setiap field
placeholder ditandai komentar `// TODO`.

Spesifikasi teknis produk (fixed carbon, moisture, kemasan, MOQ, dll)
ada di:

```
src/lib/products.ts
```

Angka-angka di sana adalah kisaran umum industri untuk keperluan
prototipe — ganti dengan hasil uji lab/spesifikasi pabrik Anda yang
sebenarnya.

Foto produk/pabrik belum ada (masih pakai ikon + gradient sebagai
placeholder visual). Setelah ada foto asli, ganti area terkait di:
- `src/components/ProductCard.tsx` (thumbnail kartu produk)
- `src/app/[locale]/page.tsx` (bagian "About teaser")
- `src/app/[locale]/products/[slug]/page.tsx` (header produk)

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) — otomatis redirect
ke `/id` (bahasa default).

## Struktur konten & terjemahan

Semua teks yang tampil di halaman ada di 4 file JSON ini, dengan
struktur key yang identik satu sama lain:

```
messages/id.json   (Bahasa Indonesia — sumber utama)
messages/en.json   (English)
messages/ar.json   (Arabic — otomatis render RTL)
messages/zh.json   (Chinese Simplified)
```

Untuk mengubah teks di halaman manapun, cari key yang sesuai di
keempat file tersebut dan edit isinya (jangan ubah nama key-nya, hanya
value-nya).

## Struktur halaman

```
src/app/[locale]/
├── page.tsx              → Beranda
├── about/page.tsx         → Tentang Kami
├── products/page.tsx      → Daftar Produk
├── products/[slug]/page.tsx → Detail produk (charcoal-briquette, coconut-shell-charcoal, semi-husked-coconut)
└── contact/page.tsx       → Kontak (form via mailto + info WhatsApp)
```

Form kontak saat ini bersifat client-side saja (membuka aplikasi email
via `mailto:` dengan isi form yang sudah terisi otomatis) — belum
terhubung ke backend/email service. Jika ingin form terkirim langsung
tanpa membuka aplikasi email, perlu ditambahkan API route + layanan
email (mis. Resend/Nodemailer) secara terpisah.

## SEO

- Setiap halaman punya `generateMetadata` sendiri (title, description).
- `sitemap.xml` dan `robots.txt` digenerate otomatis
  (`src/app/sitemap.ts`, `src/app/robots.ts`), termasuk hreflang
  alternate untuk 4 bahasa.
- Structured data (JSON-LD `Organization`) disisipkan di
  `src/app/[locale]/layout.tsx`.
- Domain di `siteConfig.domain` (`src/lib/site-config.ts`) dipakai
  sebagai basis semua URL absolut — **wajib diganti** ke domain asli
  sebelum deploy, kalau tidak sitemap/canonical URL akan salah.

## Build & deploy

```bash
npm run build
npm run start
```

Project ini pakai Next.js server biasa (bukan static export), jadi
cocok di-deploy ke Vercel atau hosting Node.js apa pun — bukan ke
Apache/XAMPP secara langsung.
