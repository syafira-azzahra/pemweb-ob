## Catatan Keputusan Desain (Modul 3 - Responsive Landing Page)

- **Flexbox** digunakan pada navigasi karena tata letaknya satu dimensi (baris menu).
- **CSS Grid** digunakan pada bagian Ringkasan Fitur karena tata letaknya dua dimensi
  (baris dan kolom kartu yang jumlahnya menyesuaikan lebar layar).
- **Custom properties** digunakan untuk warna, spacing, dan radius agar konsisten
  dan mudah diubah dari satu tempat (`:root`).
- **Media query** breakpoint (40rem dan 60rem) dipilih berdasarkan titik saat
  kartu fitur mulai terlihat sesak, bukan berdasarkan ukuran perangkat tertentu.
- **Foto latar pada hero** diberi lapisan overlay gelap solid agar teks putih
  tetap kontras dan mudah dibaca di atas foto tambak asli.
- **Komponen reusable** yang dibuat: `.hero` (bagian pembuka), `.card` (ringkasan
  fitur), dan tombol (`button`) yang gaya dan warnanya konsisten di seluruh halaman