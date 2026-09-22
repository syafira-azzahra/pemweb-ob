import { hitungKonsumsiPakan, ringkasDataTambak } from './utils.js';

const dataTambak = [
    { id: 1, tanggal: '2026-10-01', pakanDiberikan: 50, pakanSisa: 2, status: 'Normal' },
    { id: 2, tanggal: '2026-10-02', pakanDiberikan: 50, pakanSisa: 5, status: 'Normal' },
    { id: 3, tanggal: '2026-10-03', pakanDiberikan: 50, pakanSisa: 25, status: 'Waspada' },
    { id: 4, tanggal: '2026-10-04', pakanDiberikan: 50, pakanSisa: 1, status: 'Normal' }
];

console.log("=== SISTEM MONITORING SIJAGA TAMBAK ===");

try {
    const analisisHarian = dataTambak.map(hari => {
        const { tanggal, pakanDiberikan, pakanSisa, status } = hari;
        const persentase = hitungKonsumsiPakan(pakanDiberikan, pakanSisa);
        
        return `Tgl ${tanggal}: Konsumsi ${persentase}% | Status: ${status}`;
    });
    console.log("Analisis Konsumsi Harian:", analisisHarian);

    const daftarWaspada = dataTambak.filter(hari => hari.status === 'Waspada');
    console.log("\nHari Waspada (Indikasi Penurunan Nafsu Makan):", daftarWaspada);

    const idDicari = 3;
    const dataSpesifik = dataTambak.find(hari => hari.id === idDicari);
    console.log(`\nPencarian Data ID ${idDicari}:`, dataSpesifik);

    console.log("\nRingkasan Total Bulan Ini:");
    console.log(ringkasDataTambak(dataTambak));

} catch (error) {
    console.error("Terjadi Kesalahan Sistem:", error.message);
}