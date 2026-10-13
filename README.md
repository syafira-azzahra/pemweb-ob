# SiJaga Tambak - Mini Dashboard API (Pertemuan 7)

## Deskripsi Proyek
Sistem monitoring kualitas air kolam tambak (pH dan suhu) berbasis web yang mengonsumsi data dari endpoint lokal JSON menggunakan JavaScript `fetch()`, `async/await`, dan penanganan *error*.

## Dokumentasi Endpoint API
* **Nama Endpoint:** Data Kualitas Air Kolam
* **Method & URL:** `GET` / `data/kolam.json`
* **Deskripsi:** Mengambil data parameter kualitas air harian untuk penjaga dan pemilik tambak.
* **Contoh Response JSON:**
  ```json
  [
    { "id": 1, "nama_kolam": "Kolam Alpha", "ph": 7.4, "suhu": 28, "status": "Optimal" }
  ]