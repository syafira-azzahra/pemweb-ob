# SiJaga Tambak - Sistem Monitoring Kesehatan Tambak

Proyek ini dikembangkan untuk memenuhi tugas mata kuliah **Pemrograman Web** (Modul 05: DOM, Event, Web Storage, dan Dynamic UI). SiJaga Tambak adalah aplikasi web untuk memantau kesehatan udang dan bandeng melalui pencatatan konsumsi pakan harian guna mendeteksi penyakit secara dini.

## Fitur Interaktif Modul 5
1. **Render DOM Aman & Dinamis**: Menerjemahkan data *array* menjadi kartu informasi (*card*) secara otomatis tanpa menggunakan teknik `innerHTML` yang berisiko, melainkan menggunakan `createElement` dan `textContent`.
2. **Pencarian Real-Time (Event Input)**: Menyaring status kolam ("Waspada" atau "Normal") dan tanggal pencatatan secara instan saat pengguna mengetik di kolom pencarian.
3. **Event Delegation untuk Tombol Detail**: Memasang *listener* secara efisien pada kontainer utama untuk memunculkan kotak laporan rinci sisa pakan saat tombol "Cek Detail" ditekan.
4. **Web Storage (Local Storage)**: Menyimpan preferensi batas jumlah hari/data yang ingin ditampilkan oleh pengguna (`limitTambak`), sehingga pengaturan tetap tersimpan meskipun halaman dimuat ulang (*reload*).
5. **Form Pencatatan Harian (Event Submit)**: Memungkinkan pengguna memasukkan data baru secara interaktif, yang langsung divalidasi dan dirender ulang ke layar seketika.

## Teknologi yang Digunakan
- HTML5 Semantik
- CSS3 (Flexbox & Grid)
- JavaScript Modern (ES Modules)
- Laragon 5 (Local Server)
- Git & GitHub (Version Control)

---

## Refleksi Mahasiswa

* **Konsep apa yang dipahami?**
  Saya memahami bagaimana *Document Object Model* (DOM) bertindak sebagai jembatan hidup antara struktur HTML statis dan logika pemrograman JavaScript, sehingga halaman web dapat merespons tindakan pengguna secara *real-time*[cite: 6]. Saya juga memahami pentingnya mengamankan DOM dari kerentanan injeksi data menggunakan elemen eksplisit (`createElement` dan `textContent`), serta efisiensi penerapan *Event Delegation* dan pemanfaatan `localStorage` untuk menyimpan preferensi non-sensitif di sisi *browser*[cite: 6].

* **Masalah apa yang ditemukan dan bagaimana penyelesaiannya?**
  Tantangan utama yang saya temukan adalah menjaga agar tata letak elemen antarmuka (*layout*) proyek utama tidak berantakan saat menyisipkan elemen dinamis baru. Selain itu, saya sempat mengalami kendala logika saat menggabungkan fitur pembatas jumlah data (`slice`) dengan fitur pencarian teks (`filter`). Masalah ini diselesaikan dengan memastikan proses pemotongan batas data dijalankan terlebih dahulu sebelum array disaring berdasarkan kata kunci masukan pengguna.

* **Bukti apa yang menunjukkan hasil sudah benar?**
  Kebenaran fungsionalitas dibuktikan melalui antarmuka web yang merespons secara aktif: kolom pencarian menyaring kartu seketika tanpa *reload*, tombol detail memunculkan rincian pakan dengan akurat, *dropdown* batas data tersimpan secara persisten di tab *Local Storage* DevTools, dan form pencatatan berhasil menyuntikkan data baru ke layar[cite: 6].

* **Jika menggunakan AI, bagian apa yang dibantu dan bagaimana verifikasinya?**
  AI digunakan sebagai mitra diskusi untuk merapikan struktur logika validasi *error handling* (`try...catch`) pada perhitungan pakan serta menyelaraskan pola *event delegation* yang aman. Proses verifikasi dilakukan secara mandiri dengan menguji langsung kode melalui *local server* Laragon di `localhost/pemweb-obe/`, memeriksa tab *Console* dari potensi pesan *error*, serta menguji berbagai skenario masukan (*edge cases*) secara langsung di *browser*[cite: 6].