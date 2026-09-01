# Project Pemrograman Web OBE

## Analisis Website Kementerian Sekretariat Negara

Project ini dibuat untuk memenuhi Tugas OBE Pemrograman Web.

Website yang dianalisis:

https://www.setneg.go.id/

## Tujuan

Tugas ini bertujuan untuk memahami proses request dan response HTTP melalui pengamatan Network tab pada browser. Analisis dilakukan secara pasif tanpa mencoba mengubah, mengeksploitasi, atau mengganggu sistem website.

## Analisis HTTP Request

Analisis dilakukan menggunakan Network tab pada browser Google Chrome dengan mengamati request dan response yang terjadi ketika website diakses.

| No | Request | Method | Status | Content Type | Ukuran | Fungsi |
|---|---|---|---|---|---|---|
| 1 | www.setneg.go.id | GET | 200 OK | text/html | 18.2 KB | Mengambil halaman utama website |
| 2 | site.min.css | GET | 200 OK | text/css | 27.9 KB | Memuat stylesheet untuk mengatur tampilan halaman |
| 3 | jquery.js | GET | 200 OK | application/javascript | 91.5 KB | Menyediakan library JavaScript untuk fungsi interaktif halaman |
| 4 | 440x220_5333WhatsApp...jpeg | GET | 200 OK | image/jpeg | 20.2 KB | Memuat gambar yang ditampilkan pada halaman website |
| 5 | Roboto-Regular-webfont.woff | GET | 200 OK | font/woff | 25.020 bytes | Memuat font Roboto yang digunakan pada halaman |

## Kesimpulan

Dari hasil pengamatan, satu halaman website dapat menghasilkan banyak request untuk mengambil berbagai jenis sumber daya, seperti HTML, CSS, JavaScript, gambar, dan font. Sebagian besar request yang diamati memiliki status 200 OK yang menunjukkan bahwa server berhasil memberikan resource yang diminta oleh browser.

Analisis dilakukan hanya dengan mengamati request dan response melalui Network tab dan tidak melakukan perubahan atau gangguan terhadap sistem website.

## Tools

- Google Chrome DevTools
- Network Tab
- Visual Studio Code
- Laragon
- Git