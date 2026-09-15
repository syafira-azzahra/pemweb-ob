# Catatan Penggunaan AI (AI Usage Log)

Selama pengembangan proyek SiJaga Tambak (khususnya pada pengerjaan Modul 3: CSS Modern & Responsive Design), saya menggunakan bantuan AI (Gemini) sebagai asisten virtual. Berikut rinciannya:

| Tanggal | Kendala / Permintaan | Bantuan yang Diberikan AI | Verifikasi & Modifikasi Saya |
| :--- | :--- | :--- | :--- |
| 15 Sep 2026 | *Syntax error* pada CSS dan gambar HTML terpotong. | Menemukan tag penutup komentar `*/` yang hilang di CSS dan melengkapi tag `<img src="...">` di HTML. | Saya mengecek ulang baris 58 di `styles.css` dan section `#fitur` di HTML, lalu menerapkan perbaikan tersebut dan memastikan halaman berjalan normal di `localhost`. |
| 15 Sep 2026 | Teks hero section menyatu dengan *background* (tidak terbaca) dan *font* kurang menarik. | Menyarankan penggunaan Google Fonts 'Poppins' dan menambahkan `text-shadow` serta mengubah warna *overlay* pada latar belakang. | Saya menyalin kode yang diberikan, memastikan keterbacaan kontras visual menjadi jauh lebih baik di semua ukuran layar, dan menambahkan elemen tersebut ke proyek. |
| 15 Sep 2026 | Masalah identitas tidak dikenal saat melakukan `git commit` di terminal lokal. | Memberikan panduan perintah `git config --global user.name` dan `user.email` untuk mengatur identitas Git lokal. | Saya menjalankan perintah tersebut di terminal VS Code menggunakan nama dan email saya sendiri, sehingga `commit` dan `push` berhasil dieksekusi. |