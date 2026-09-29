import { hitungKonsumsiPakan, ringkasDataTambak } from './utils.js';

// 1. Data Sumber SiJaga Tambak (Array of Objects)
const dataTambak = [
    { id: 1, tanggal: '2026-10-01', pakanDiberikan: 50, pakanSisa: 2, status: 'Normal' },
    { id: 2, tanggal: '2026-10-02', pakanDiberikan: 50, pakanSisa: 5, status: 'Normal' },
    { id: 3, tanggal: '2026-10-03', pakanDiberikan: 50, pakanSisa: 25, status: 'Waspada' },
    { id: 4, tanggal: '2026-10-04', pakanDiberikan: 50, pakanSisa: 1, status: 'Normal' },
    { id: 5, tanggal: '2026-10-05', pakanDiberikan: 50, pakanSisa: 20, status: 'Waspada' },
    { id: 6, tanggal: '2026-10-06', pakanDiberikan: 50, pakanSisa: 3, status: 'Normal' }
];

console.log("=== SISTEM MONITORING SIJAGA TAMBAK ===");
console.log(ringkasDataTambak(dataTambak)); 

// ==========================================================
// TUGAS OBE MODUL 5: DOM, EVENT, DAN WEB STORAGE
// ==========================================================

const containerDaftar = document.querySelector('#daftar-tambak');
const inputPencarian = document.querySelector('#search');
const pilihanLimit = document.querySelector('#limit');
const formTambahData = document.querySelector('#form-tambah-data'); // Form baru

// FUNGSI RENDER UTAMA
function renderDaftarTambak(dataList) {
    containerDaftar.replaceChildren();

    if (dataList.length === 0) {
        const pesan = document.createElement('p');
        pesan.textContent = 'Data pencatatan tidak ditemukan.';
        containerDaftar.append(pesan);
        return;
    }

    for (const item of dataList) {
        const card = document.createElement('div');
        card.className = item.status === 'Waspada' ? 'card card-waspada' : 'card card-normal';

        const title = document.createElement('h3');
        title.textContent = `Tanggal: ${item.tanggal}`;

        const info = document.createElement('p');
        try {
            const persentase = hitungKonsumsiPakan(item.pakanDiberikan, item.pakanSisa);
            info.textContent = `Status: ${item.status} | Pakan Termakan: ${persentase}%`;
        } catch (error) {
            info.textContent = `Data pakan tidak valid: ${error.message}`;
        }

        const btnDetail = document.createElement('button');
        btnDetail.type = 'button';
        btnDetail.className = 'btn-detail';
        btnDetail.textContent = 'Cek Detail';
        btnDetail.dataset.detail = item.id; 

        card.append(title, info, btnDetail);
        containerDaftar.append(card);
    }
}

// EVENT 1: Pencarian Real-Time
inputPencarian.addEventListener('input', (event) => {
    const kataKunci = event.target.value.toLowerCase();
    const limitAktif = Number(pilihanLimit.value);
    
    const dataTerpotong = dataTambak.slice(0, limitAktif);
    const hasilCari = dataTerpotong.filter(item => 
        item.status.toLowerCase().includes(kataKunci) || item.tanggal.includes(kataKunci)
    );
    renderDaftarTambak(hasilCari);
});

// EVENT 2: Menampilkan Detail via Event Delegation
containerDaftar.addEventListener('click', (event) => {
    const button = event.target.closest('[data-detail]');
    if (!button) return; 

    const idDicari = Number(button.dataset.detail);
    const itemTerpilih = dataTambak.find(data => data.id === idDicari);

    if (itemTerpilih) {
        const areaDetail = document.querySelector('#detail-area');
        const teksDetail = document.querySelector('#detail-teks');
        
        teksDetail.textContent = `Rincian Tanggal ${itemTerpilih.tanggal}: Diberikan ${itemTerpilih.pakanDiberikan}kg pakan, tersisa ${itemTerpilih.pakanSisa}kg di tambak. (Status saat ini: ${itemTerpilih.status})`;
        areaDetail.style.display = 'block';
    }
});

// EVENT 3: Web Storage Preferensi Limit
pilihanLimit.value = localStorage.getItem('limitTambak') ?? '6';

pilihanLimit.addEventListener('change', () => {
    localStorage.setItem('limitTambak', pilihanLimit.value);
    
    inputPencarian.value = ''; 
    document.querySelector('#detail-area').style.display = 'none';
    
    renderDaftarTambak(dataTambak.slice(0, Number(pilihanLimit.value)));
});

// EVENT 4 (EKSKLUSIF TUGAS OBE): Tambah Data Harian (Event Submit)
formTambahData.addEventListener('submit', (event) => {
    event.preventDefault(); // Mencegah reload halaman

    const tglBaru = document.querySelector('#input-tanggal').value;
    const diberiBaru = Number(document.querySelector('#input-diberi').value);
    const sisaBaru = Number(document.querySelector('#input-sisa').value);

    try {
        const persentase = hitungKonsumsiPakan(diberiBaru, sisaBaru);
        const statusBaru = persentase < 70 ? 'Waspada' : 'Normal';

        const dataBaru = {
            id: Date.now(), 
            tanggal: tglBaru,
            pakanDiberikan: diberiBaru,
            pakanSisa: sisaBaru,
            status: statusBaru
        };
        
        dataTambak.unshift(dataBaru); // Masukkan ke awal array
        
        // Render ulang layar dengan limit terbaru
        const limitAktif = Number(pilihanLimit.value);
        renderDaftarTambak(dataTambak.slice(0, limitAktif));

        formTambahData.reset(); // Kosongkan form
        alert(`Berhasil! Data tanggal ${tglBaru} disimpan dengan status: ${statusBaru}`);

    } catch (error) {
        alert(`Gagal menyimpan: ${error.message}`);
    }
});

// --- Inisialisasi awal saat web dibuka ---
renderDaftarTambak(dataTambak.slice(0, Number(pilihanLimit.value)));