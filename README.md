# 🏔️ Sewuncak - Mountain Gear & Outfit Rental Platform

Sewuncak adalah platform berbasis web untuk penyewaan outfit dan perlengkapan kegiatan mendaki gunung. Pengguna dapat melihat katalog perlengkapan outdoor, memilih peralatan sesuai durasi pendakian, dan melakukan pengajuan sewa. Admin bertugas mengelola inventaris outfit, memantau transaksi rental, dan melihat data pengguna terdaftar.

---

## 🛠️ Teknologi Yang Digunakan

- **Backend**: NestJS (TypeScript), Prisma ORM, PostgreSQL (via Docker), JWT Authentication, Swagger API Docs.
- **Frontend**: Next.js 16 (App Router), React, Tailwind CSS, Lucide Icons.

---

## 📋 Catatan Perubahan & Integrasi (Integrasi Backend <-> Frontend)

Seluruh data *mock/dummy* pada frontend Next.js telah dihapus dan dihubungkan secara penuh dengan API backend NestJS & database PostgreSQL.

### 🔹 Perubahan Backend (`sewuncak-backend`)
1. **Konfigurasi CORS (`src/main.ts`)**:
   - Mengaktifkan CORS agar frontend yang berjalan di `http://localhost:3001` dapat berkomunikasi tanpa diblokir browser.
2. **Modul Pengguna (`src/app.module.ts`)**:
   - Mendaftarkan `UsersModule` ke `AppModule` untuk mengaktifkan endpoint `GET /users` dan `GET /users/profile`.
3. **DTO & Validasi Outfit (`src/outfit/dto/create-outfit.dto.ts`)**:
   - Mengubah validasi `category` dan `image_url` menjadi String agar mendukung semua variasi kategori peralatan gunung (Tenda & Shelter, Carrier & Tas, Sepatu Tracking, Alat Masak, Penerangan, dll).
4. **DTO & Validasi Status Rental (`src/rental/dto/update-rental-status.dto.ts`)**:
   - Menambahkan status `APPROVED` ke enum dan mengizinkan format string status untuk pengubahan status transaksi oleh admin (`APPROVED`, `RENTED`, `RETURNED`, `CANCELLED`).
5. **Peningkatan Service Rental (`src/rental/rental.service.ts`)**:
   - Meng-include relasi `users` dan `outfits` pada query `rental_items` agar data pemesan dan nama outfit dapat ditampilkan di panel admin & riwayat.
   - Menangani kalkulasi hari sewa minimal 1 hari jika tanggal mulai dan selesai berada pada hari yang sama.
6. **Koneksi Database & Port (`src/prisma/prisma.service.ts` & `.env`)**:
   - Menyesuaikan port PostgreSQL ke `5433` untuk menghindari bentrok dengan service PostgreSQL lokal Windows.
7. **Database Seeding (`prisma/seed.ts`)**:
   - Membuat script seeding otomatis untuk memasukkan akun Admin default dan katalog outfit awal (Tenda 2P, Carrier 60L, Sepatu, Jaket, Kompor Portable, Headlamp).

### 🔹 Perubahan Frontend (`sewuncak-frontend`)
1. **Autentikasi (`lib/AuthContext.tsx` & `lib/api.ts`)**:
   - Terintegrasi penuh dengan `POST /auth/login` dan `POST /auth/register`. Token JWT dan data profile disimpan di `localStorage`.
2. **Katalog & Detail Outfit (`app/outfits/page.tsx` & `app/outfits/[id]/page.tsx`)**:
   - Menampilkan data outfit *real-time* dari backend (`GET /outfits` & `GET /outfits/:id`).
3. **Formulir & Checkout Rental (`app/rental/page.tsx`)**:
   - Mengirimkan payload pengajuan rental nyata ke `POST /rentals` dengan konversi tipe data angka (`Number`) dan ISO String date.
4. **Riwayat Penyewaan (`app/history/page.tsx`)**:
   - Membaca data transaksi sewa user dari `GET /rentals/user/:id` dan menangani pembacaan array `rental_items`.
5. **Dashboard Admin (`app/admin/dashboard/page.tsx`)**:
   - Menampilkan total statistik *real* (jumlah outfit, total transaksi, estimasi pendapatan) dari backend.
6. **Kelola Outfit Admin (`app/admin/outfits/page.tsx`)**:
   - Mendukung penuh operasi CRUD (Create, Read, Update, Delete) outfit yang langsung tersimpan di database PostgreSQL.
7. **Kelola Rental Admin (`app/admin/rentals/page.tsx`)**:
   - Mengubah status transaksi secara *real-time* lewat `PATCH /rentals/:id/status`.
8. **Data User Admin (`app/admin/users/page.tsx`)**:
   - Menampilkan seluruh pengguna yang terdaftar dari endpoint `GET /users`.

---

## 🔑 Kredensial Admin Default

- **Email**: `admin@sewuncak.com`
- **Password**: `admin123`

---

## 🚀 Cara Menjalankan Aplikasi

### 1. Database (PostgreSQL Docker)
```bash
docker run -d --name sewuncak-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=sewuncak -p 5433:5432 postgres:15
```

### 2. Backend (NestJS)
```bash
cd sewuncak-backend
npx prisma db push
npx ts-node prisma/seed.ts
npm run start:dev
```
*Backend berjalan di: `http://localhost:3000` (Swagger docs di `/api`)*

### 3. Frontend (Next.js)
```bash
cd sewuncak-frontend
npm run dev
```
*Frontend berjalan di: `http://localhost:3001`*

---

## 📦 Git Commit & Push Status
Semua perubahan telah diverifikasi melalui `npm run build` pada kedua repository dengan status **0 error / Success**.
