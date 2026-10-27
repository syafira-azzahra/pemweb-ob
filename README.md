# Backend API - SiJaga Tambak

Sistem monitoring kualitas air dan manajemen pakan untuk tambak udang dan bandeng berbasis IoT.

## Persyaratan Sistem
- **Server:** Laragon 5
- **PHP:** Versi 8.4
- **Package Manager:** Composer

## Cara Menjalankan
1. Clone repositori ke dalam folder document root Laragon (misalnya `D:\Semester5\laragon\www\pemweb-obe`).
2. Buka Terminal Laragon, arahkan ke folder proyek, dan jalankan perintah `composer install`.
3. Salin file `.env.example` menjadi `.env`. File ini digunakan untuk konfigurasi environment lokal dan tidak boleh masuk ke repository.
4. Buka aplikasi Laragon 5 dan klik tombol **Start All**.

## Dokumentasi Endpoint API
### 1. `GET /api/alats.php`
- **Fungsi:** Mengambil data inventaris sensor atau alat monitoring tambak.
- **Response Sukses:** `200 OK` (Format JSON).

### 2. `POST /api/alats.php`
- **Fungsi:** Menambah data alat/sensor baru ke dalam sistem.
- **Validasi Body:** Wajib format JSON, nama alat maksimal 100 karakter, dan jumlah harus angka positif.
- **Response Sukses:** `201 Created`
- **Response Error:** 
  - `400 Bad Request` (Format JSON rusak atau bukan object).
  - `415 Unsupported Media Type` (Header Content-Type bukan JSON).
  - `422 Unprocessable Content` (Gagal aturan validasi bisnis).
  - `405 Method Not Allowed` (Jika diakses menggunakan DELETE/PUT).