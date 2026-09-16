// js/app.js
// Panggil rumus dari utils.js di baris paling atas
import { ringkasInventaris, cariAlatById } from './utils.js';

const inventaris = [
    { id: 1, nama: 'Kincir Air (Paddle Wheel)', kategori: 'Mesin', jumlah: 4, kondisi: 'Baik' },
    { id: 2, nama: 'Sensor Suhu & pH', kategori: 'IoT', jumlah: 2, kondisi: 'Rusak' },
    { id: 3, nama: 'Pompa Air Submersible', kategori: 'Mesin', jumlah: 1, kondisi: 'Baik' },
    { id: 4, nama: 'Jaring Panen', kategori: 'Alat Tangkap', jumlah: 10, kondisi: 'Baik' }
];

console.log("=== PRAKTIKUM MODUL 4 ===");
console.table(inventaris);

// 3. Filter
const alatBaik = inventaris.filter(item => item.kondisi === 'Baik');
console.log("\nAlat kondisi Baik (Filter):", alatBaik);

// 4. Map
const namaAlat = inventaris.map(item => item.nama);
console.log("Daftar Nama Alat (Map):", namaAlat);

// 5. Reduce
const totalJumlahAlat = inventaris.reduce((total, item) => total + item.jumlah, 0);
console.log(`Total Keseluruhan Jumlah Alat (Reduce): ${totalJumlahAlat} unit`);

// 6 & 7. Hasil Fungsi dari utils.js
console.log("\nHasil Fungsi ringkasInventaris():");
console.log(ringkasInventaris(inventaris));


console.log("\n=== LATIHAN TERBIMBING ===");

// Latihan 1: Map + Filter
const inventarisDenganLokasi = inventaris.map(item => ({
    ...item,
    lokasi: item.kategori === 'Mesin' ? 'Gudang Utama' : 'Gudang Alat'
}));
const itemDiLokasi = inventarisDenganLokasi.filter(item => item.lokasi === 'Gudang Utama');
console.log("Latihan 1 - Alat di Gudang Utama:", itemDiLokasi);

// Latihan 2: Find dari utils.js
try {
    const alatId2 = cariAlatById(inventaris, 2);
    console.log("Latihan 2 - Pencarian ID 2 Berhasil:", alatId2);
} catch (error) {
    console.error(error.message);
}

// Latihan 3: Destructuring & Template Literal
console.log("\nLatihan 3 - Ringkasan:");
inventaris.forEach(item => {
    const { nama, kategori, jumlah, kondisi } = item;
    console.log(`- [${kategori}] ${nama}: Tersedia ${jumlah} unit (Kondisi: ${kondisi}).`);
});