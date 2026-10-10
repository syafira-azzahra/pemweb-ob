# SiJaga Tambak - Sistem Monitoring Kesehatan Tambak

Proyek ini dikembangkan untuk memenuhi tugas mata kuliah **Pemrograman Web** (Tugas OBE Pertemuan 6: Form, Validasi, Accessibility & Input Handling)[cite: 55].

## Deskripsi Form
Form utama yang ditambahkan adalah **Form Pencatatan Harian Pakan & Kondisi Kolam**[cite: 49]. Form ini bertujuan untuk mengumpulkan data harian dari penjaga tambak secara valid dan konsisten sebelum diproses oleh sistem ke dalam bentuk riwayat pakan.

## Catatan Aksesibilitas (Accessibility)
Form ini telah dirancang agar ramah terhadap pengguna dan teknologi bantu (*screen reader*)[cite: 49]:
- Atribut `novalidate` digunakan pada tag `<form>` untuk mengambil alih kontrol validasi dari browser agar pesan error dapat dikustomisasi[cite: 37].
- Setiap input memiliki tag `<label>` yang terhubung secara eksplisit melalui atribut `for` dan `id`[cite: 37].
- Pesan error dihubungkan secara semantik dengan input menggunakan atribut `aria-describedby`[cite: 37].
- Elemen dinamis seperti *Error Summary* dan pesan error individual menggunakan atribut `aria-live="polite"` agar perubahannya dibacakan otomatis oleh *screen reader* tanpa mengganggu pengguna[cite: 37].

## Catatan Peer Review
Berdasarkan pengujian dan ulasan dari rekan (*peer review*), berikut adalah temuan dan perbaikan yang telah dilakukan[cite: 51]:
1. **Temuan 1:** Form sebelumnya belum ramah *keyboard* dan *screen reader*, pengguna kebingungan mencari letak kesalahan jika form gagal disubmit[cite: 51].
   **Perbaikan 1:** Menambahkan atribut `aria-describedby`, menampilkan *Error Summary* di bagian atas form, dan membuat skrip JavaScript untuk otomatis memfokuskan kursor (`focus()`) ke *field* pertama yang mengalami error[cite: 51].
2. **Temuan 2:** Validasi error bawaan browser atau penggunaan `alert()` kurang spesifik, tidak informatif, dan mengganggu UX[cite: 51].
   **Perbaikan 2:** Menghapus penggunaan `alert()` sebagai feedback tunggal. Menggantinya dengan validasi *client-side* berbasis JavaScript yang memunculkan teks pesan error spesifik dan outline merah tepat di masing-masing *field* input yang bermasalah[cite: 51].

## Refleksi Singkat
Melalui tugas Pertemuan 6 ini, saya menyadari bahwa form bukan sekadar elemen untuk mengumpulkan data, melainkan gerbang utama interaksi pengguna yang harus memberikan panduan jelas[cite: 56]. Saya belajar mengimplementasikan HTML form yang aksesibel, melakukan proses *input handling* seperti normalisasi spasi menggunakan `.trim()`, serta merancang 5 aturan validasi *client-side* berbasis JavaScript[cite: 55]. Tantangan utama adalah memanipulasi DOM untuk menampilkan pesan error spesifik tepat di dekat *field* yang salah tanpa merusak tata letak form secara keseluruhan. Dengan praktik pencegahan error di sisi klien ini, saya menjadi lebih siap untuk menghubungkan data form dengan *backend*/API di pertemuan selanjutnya[cite: 56].