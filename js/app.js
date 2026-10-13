import { hitungKonsumsiPakan, ringkasDataTambak } from './utils.js';

// ==========================================================
// KODE LAMA: DATA SUMBER SIJAGA TAMBAK & VALIDASI (UTUH)
// ==========================================================
const dataTambak = [
    { id: 1, tanggal: '2026-10-01', pakanDiberikan: 50, pakanSisa: 2, kategori: 'Kolam A - Udang Vaname', status: 'Normal' },
    { id: 2, tanggal: '2026-10-02', pakanDiberikan: 50, pakanSisa: 5, kategori: 'Kolam B - Ikan Bandeng', status: 'Normal' },
    { id: 3, tanggal: '2026-10-03', pakanDiberikan: 50, pakanSisa: 25, kategori: 'Kolam A - Udang Vaname', status: 'Waspada' }
];

const containerDaftar = document.querySelector('#daftar-tambak');
const inputPencarian = document.querySelector('#search');
const pilihanLimit = document.querySelector('#limit');
const formTambahData = document.querySelector('#formTambahData');
const errorSummary = document.querySelector('#errorSummary');

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
        title.textContent = `Tanggal: ${item.tanggal} (${item.kategori || 'Kolam Umum'})`;

        const info = document.createElement('p');
        try {
            const persentase = hitungKonsumsiPakan(item.pakanDiberikan, item.pakanSisa);
            info.textContent = `Status: ${item.status} | Pakan Termakan: ${persentase.toFixed(1)}%`;
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

function readFormData(form) {
    return {
        tanggal: form.tanggal.value.trim(),
        pakanDiberi: form.pakanDiberi.value.trim() === '' ? '' : Number(form.pakanDiberi.value),
        pakanSisa: form.pakanSisa.value.trim() === '' ? '' : Number(form.pakanSisa.value),
        kategori: form.kategori.value,
        setuju: form.setuju.checked
    };
}

function validateForm(data) {
    const errors = {};
    if (!data.tanggal) errors.tanggal = 'Tanggal pencatatan wajib diisi.';
    if (data.pakanDiberi === '' || isNaN(data.pakanDiberi) || data.pakanDiberi < 1) errors.pakanDiberi = 'Jumlah pakan diberikan minimal 1 kg.';
    if (data.pakanSisa === '' || isNaN(data.pakanSisa) || data.pakanSisa < 0) {
        errors.pakanSisa = 'Sisa pakan tidak boleh bernilai negatif.';
    } else if (data.pakanSisa > data.pakanDiberi) {
        errors.pakanSisa = 'Sisa pakan tidak boleh melebihi jumlah pakan yang diberikan.';
    }
    if (!data.kategori) errors.kategori = 'Silakan pilih kategori kolam tambak.';
    if (data.setuju !== true) errors.setuju = 'Anda harus mencentang kotak persetujuan sebelum menyimpan.';
    return errors;
}

function clearErrors() {
    const errorElements = formTambahData.querySelectorAll('.error-text');
    errorElements.forEach(el => { el.textContent = ''; el.style.display = 'none'; });
    const inputs = formTambahData.querySelectorAll('input, select');
    inputs.forEach(input => input.classList.remove('input-error'));
    errorSummary.style.display = 'none';
}

function renderErrors(errors) {
    clearErrors();
    let firstErrorField = null;
    for (const [field, message] of Object.entries(errors)) {
        let inputEl = null; let errorSmallEl = null;
        if (field === 'tanggal') { inputEl = formTambahData.querySelector('#inputTanggal'); errorSmallEl = formTambahData.querySelector('#errorTanggal'); }
        else if (field === 'pakanDiberi') { inputEl = formTambahData.querySelector('#inputDiberi'); errorSmallEl = formTambahData.querySelector('#errorDiberi'); }
        else if (field === 'pakanSisa') { inputEl = formTambahData.querySelector('#inputSisa'); errorSmallEl = formTambahData.querySelector('#errorSisa'); }
        else if (field === 'kategori') { inputEl = formTambahData.querySelector('#inputKategori'); errorSmallEl = formTambahData.querySelector('#errorKategori'); }
        else if (field === 'setuju') { inputEl = formTambahData.querySelector('#inputSetuju'); errorSmallEl = formTambahData.querySelector('#errorSetuju'); }

        if (inputEl && errorSmallEl) {
            inputEl.classList.add('input-error');
            errorSmallEl.textContent = message;
            errorSmallEl.style.display = 'block';
            if (!firstErrorField) firstErrorField = inputEl;
        }
    }
    errorSummary.style.display = 'block';
    if (firstErrorField) firstErrorField.focus();
}

const DRAFT_KEY = 'siJagaTambakFormDraft';
function saveFormDraft() { localStorage.setItem(DRAFT_KEY, JSON.stringify(readFormData(formTambahData))); }
function loadFormDraft() {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) {
        const data = JSON.parse(saved);
        if (formTambahData.tanggal) formTambahData.tanggal.value = data.tanggal || '';
        if (formTambahData.pakanDiberi) formTambahData.pakanDiberi.value = data.pakanDiberi || '';
        if (formTambahData.pakanSisa) formTambahData.pakanSisa.value = data.pakanSisa || '';
        if (formTambahData.kategori) formTambahData.kategori.value = data.kategori || '';
        if (formTambahData.setuju) formTambahData.setuju.checked = data.setuju || false;
    }
}
formTambahData.addEventListener('input', saveFormDraft);

formTambahData.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = readFormData(formTambahData);
    const errors = validateForm(data);
    if (Object.keys(errors).length > 0) { renderErrors(errors); return; }
    clearErrors();
    try {
        const persentase = hitungKonsumsiPakan(data.pakanDiberi, data.pakanSisa);
        const statusBaru = persentase < 70 ? 'Waspada' : 'Normal';
        const dataBaru = { id: Date.now(), tanggal: data.tanggal, pakanDiberikan: data.pakanDiberi, pakanSisa: data.pakanSisa, kategori: data.kategori, status: statusBaru };
        dataTambak.unshift(dataBaru); 
        renderDaftarTambak(dataTambak.slice(0, Number(pilihanLimit.value)));
        formTambahData.reset();
        localStorage.removeItem(DRAFT_KEY); 
        alert(`Sukses! Data pencatatan tanggal ${data.tanggal} berhasil disimpan.`);
    } catch (err) { alert(`Kesalahan sistem: ${err.message}`); }
});

inputPencarian.addEventListener('input', (event) => {
    const kataKunci = event.target.value.toLowerCase();
    const hasilCari = dataTambak.slice(0, Number(pilihanLimit.value)).filter(item => 
        item.status.toLowerCase().includes(kataKunci) || item.tanggal.includes(kataKunci) || item.kategori.toLowerCase().includes(kataKunci)
    );
    renderDaftarTambak(hasilCari);
});

containerDaftar.addEventListener('click', (event) => {
    const button = event.target.closest('[data-detail]');
    if (!button) return; 
    const itemTerpilih = dataTambak.find(data => data.id === Number(button.dataset.detail));
    if (itemTerpilih) {
        document.querySelector('#detail-teks').textContent = `Rincian ${itemTerpilih.kategori} Tanggal ${itemTerpilih.tanggal}: Diberikan ${itemTerpilih.pakanDiberikan}kg, sisa ${itemTerpilih.pakanSisa}kg. (Status: ${itemTerpilih.status})`;
        document.querySelector('#detail-area').style.display = 'block';
    }
});

pilihanLimit.value = localStorage.getItem('limitTambak') ?? '6';
pilihanLimit.addEventListener('change', () => {
    localStorage.setItem('limitTambak', pilihanLimit.value);
    inputPencarian.value = ''; 
    document.querySelector('#detail-area').style.display = 'none';
    renderDaftarTambak(dataTambak.slice(0, Number(pilihanLimit.value)));
});

loadFormDraft();
renderDaftarTambak(dataTambak.slice(0, Number(pilihanLimit.value)));


// ==========================================================
// KODE BARU PERTEMUAN 7: WEB API, FETCH, & JSON (LATIHAN 1-3)
// ==========================================================

// Variabel DOM Khusus API
const API_URL = './data/kolam.json'; 
const containerDaftarApi = document.querySelector('#data-list-api');
const loadingApi = document.querySelector('#loading-api');
const errorBoxApi = document.querySelector('#error-box-api');
const errorMessageApi = document.querySelector('#error-message-api');
const retryButtonApi = document.querySelector('#retry-button-api');
const searchInputApi = document.querySelector('#search-api');

// Wadah data mentah dari API untuk kebutuhan filter
let allDataKolam = [];

// Fungsi Utama Mengambil Data dari JSON Lokal/API
async function fetchKolamData() {
    try {
        // Latihan 3: Aktifkan Loading State
        loadingApi.style.display = 'block';
        errorBoxApi.style.display = 'none';
        containerDaftarApi.innerHTML = '';

        // Latihan 2: Memanggil API dengan Fetch Async/Await
        const response = await fetch(API_URL);
        
        // Pengecekan status HTTP (Penting untuk menangani 404/500)
        if (!response.ok) {
            throw new Error(`HTTP ${response.status} - Gagal menghubungi Endpoint Server`);
        }

        // Parsing JSON menjadi Object JavaScript
        allDataKolam = await response.json();
        
        // Memanggil fungsi render ke HTML
        renderKolamData(allDataKolam);

    } catch (error) {
        // Latihan 3: Tampilkan Error State jika gagal
        errorBoxApi.style.display = 'block';
        errorMessageApi.textContent = 'Gagal memuat data tambak: ' + error.message;
    } finally {
        // Hilangkan indikator loading apapun hasilnya
        loadingApi.style.display = 'none';
    }
}

// Latihan 2: Render Data ke dalam elemen DOM
function renderKolamData(data) {
    // Jika filter tidak menemukan hasil
    if (data.length === 0) {
        containerDaftarApi.innerHTML = '<p>Tidak ada data kualitas air yang ditemukan.</p>';
        return;
    }

    // Menggunakan map() dan join() untuk memproduksi elemen HTML Card
    containerDaftarApi.innerHTML = data.map(item => `
        <article class="card ${item.status === 'Kritis' ? 'card-waspada' : (item.status === 'Waspada' ? 'card-waspada' : 'card-normal')}" style="border-width: 2px;">
            <h3 style="margin-top: 0; margin-bottom: 10px;">${item.nama_kolam}</h3>
            <p style="margin: 5px 0;"><strong>pH Air:</strong> ${item.ph}</p>
            <p style="margin: 5px 0;"><strong>Suhu:</strong> ${item.suhu}&deg;C</p>
            <p style="margin: 5px 0;"><strong>Status Air:</strong> 
                <span style="font-weight: bold; color: ${item.status === 'Kritis' ? '#dc3545' : (item.status === 'Waspada' ? '#fd7e14' : '#28a745')}">
                    ${item.status}
                </span>
            </p>
        </article>
    `).join('');
}

// Latihan 3: Fitur Filter/Search Data API di sisi Klien
searchInputApi.addEventListener('input', (event) => {
    const keyword = event.target.value.toLowerCase();
    
    // Filter langsung dari variabel allDataKolam (tanpa request ulang ke server)
    const filteredData = allDataKolam.filter(item => 
        item.nama_kolam.toLowerCase().includes(keyword) || 
        item.status.toLowerCase().includes(keyword)
    );
    
    // Render ulang UI menggunakan data yang difilter
    renderKolamData(filteredData);
});

// Event Listener tombol Coba Lagi pada Error State
retryButtonApi.addEventListener('click', fetchKolamData);

// Eksekusi Fetch saat aplikasi pertama kali dimuat
fetchKolamData();