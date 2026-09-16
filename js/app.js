// ==========================================
// PRAKTIKUM MODUL 4: PEMROGRAMAN WEB
// ==========================================

// 2. Buat array objek inventaris dengan properti id, nama, kategori, jumlah, kondisi
const inventaris = [
    { id: 1, nama: 'Kincir Air (Paddle Wheel)', kategori: 'Mesin', jumlah: 4, kondisi: 'Baik' },
    { id: 2, nama: 'Sensor Suhu & pH', kategori: 'IoT', jumlah: 2, kondisi: 'Rusak' },
    { id: 3, nama: 'Pompa Air Submersible', kategori: 'Mesin', jumlah: 1, kondisi: 'Baik' },
    { id: 4, nama: 'Jaring Panen', kategori: 'Alat Tangkap', jumlah: 10, kondisi: 'Baik' }
];

console.log("=== DATA INVENTARIS TAMBAK ===");
console.table(inventaris);

// 3. Gunakan filter untuk mengambil alat kondisi “Baik”
const alatBaik = inventaris.filter(item => item.kondisi === 'Baik');
console.log("\n3. Alat dengan kondisi Baik (Filter):");
console.table(alatBaik);

// 4. Gunakan map untuk menghasilkan array nama alat
const namaAlat = inventaris.map(item => item.nama);
console.log("\n4. Daftar Nama Alat (Map):", namaAlat);

// 5. Gunakan reduce untuk menghitung total jumlah alat
const totalJumlahAlat = inventaris.reduce((total, item) => total + item.jumlah, 0);
console.log(`\n5. Total Keseluruhan Jumlah Alat (Reduce): ${totalJumlahAlat} unit`);

// 6. Buat fungsi ringkasInventaris(data) yang mengembalikan object statistik
function ringkasInventaris(data) {
    return {
        totalJenisAlat: data.length,
        totalUnitKeseluruhan: data.reduce((total, item) => total + item.jumlah, 0),
        jumlahAlatRusak: data.filter(item => item.kondisi !== 'Baik').length
    };
}

// 7. Tampilkan hasil sementara di Console
console.log("\n6 & 7. Hasil Fungsi ringkasInventaris():");
console.log(ringkasInventaris(inventaris));