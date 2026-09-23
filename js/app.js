import { hitungKonsumsiPakan, ringkasDataTambak } from './utils.js';

const dataTambak = [
    { id: 1, tanggal: '2026-10-01', pakanDiberikan: 50, pakanSisa: 2, status: 'Normal' },
    { id: 2, tanggal: '2026-10-02', pakanDiberikan: 50, pakanSisa: 5, status: 'Normal' },
    { id: 3, tanggal: '2026-10-03', pakanDiberikan: 50, pakanSisa: 25, status: 'Waspada' },
    { id: 4, tanggal: '2026-10-04', pakanDiberikan: 50, pakanSisa: 1, status: 'Normal' },
    { id: 5, tanggal: '2026-10-05', pakanDiberikan: 50, pakanSisa: 20, status: 'Waspada' },
    { id: 6, tanggal: '2026-10-06', pakanDiberikan: 50, pakanSisa: 3, status: 'Normal' }
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

    console.log("\nRingkasan Total Bulan Ini:");
    console.log(ringkasDataTambak(dataTambak));

} catch (error) {
    console.error("Terjadi Kesalahan Sistem:", error.message);
}


const containerDaftar = document.querySelector('#daftar-tambak');
const inputPencarian = document.querySelector('#search');
const pilihanLimit = document.querySelector('#limit');

function renderDaftarTambak(dataList) {
    containerDaftar.replaceChildren(); // Bersihkan container

    if (dataList.length === 0) {
        const pesan = document.createElement('p');
        pesan.textContent = 'Data pencatatan tidak ditemukan.';
        containerDaftar.append(pesan);
        return;
    }

    for (const item of dataList) {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.border = item.status === 'Waspada' ? '2px solid red' : '1px solid #ccc';
        card.style.padding = '10px';
        card.style.marginBottom = '10px';

        const title = document.createElement('h3');
        title.textContent = `Tanggal: ${item.tanggal}`;

        const info = document.createElement('p');
        const persentase = hitungKonsumsiPakan(item.pakanDiberikan, item.pakanSisa);
        info.textContent = `Status: ${item.status} | Pakan Termakan: ${persentase}%`;

        const btnDetail = document.createElement('button');
        btnDetail.type = 'button';
        btnDetail.textContent = 'Cek Detail';
        btnDetail.dataset.detail = item.id; // Menyimpan ID ke custom attribute
        btnDetail.style.marginTop = '10px';

        card.append(title, info, btnDetail);
        containerDaftar.append(card);
    }
}

inputPencarian.addEventListener('input', (event) => {
    const kataKunci = event.target.value.toLowerCase();
    const limitAktif = Number(pilihanLimit.value);
    
    // Filter dari sekumpulan data yang sudah dipotong (slice) berdasarkan limit
    const dataTerpotong = dataTambak.slice(0, limitAktif);
    const hasilCari = dataTerpotong.filter(item => 
        item.status.toLowerCase().includes(kataKunci) || item.tanggal.includes(kataKunci)
    );
    renderDaftarTambak(hasilCari);
});

containerDaftar.addEventListener('click', (event) => {
    const button = event.target.closest('[data-detail]');
    if (!button) return; 

    const idDicari = Number(button.dataset.detail);
    const itemTerpilih = dataTambak.find(data => data.id === idDicari);

    if (itemTerpilih) {
        const areaDetail = document.querySelector('#detail-area');
        const teksDetail = document.querySelector('#detail-teks');
        
        teksDetail.textContent = `Rincian Tanggal ${itemTerpilih.tanggal}: Diberikan ${itemTerpilih.pakanDiberikan}kg pakan, tersisa ${itemTerpilih.pakanSisa}kg di tambak. (Status: ${itemTerpilih.status})`;
        areaDetail.style.display = 'block';
    }
});

pilihanLimit.value = localStorage.getItem('limitTambak') ?? '4';

pilihanLimit.addEventListener('change', () => {
    localStorage.setItem('limitTambak', pilihanLimit.value);
    
    inputPencarian.value = ''; 
    document.querySelector('#detail-area').style.display = 'none';
    renderDaftarTambak(dataTambak.slice(0, Number(pilihanLimit.value)));
});

renderDaftarTambak(dataTambak.slice(0, Number(pilihanLimit.value)));