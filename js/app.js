import { hitungKonsumsiPakan, ringkasDataTambak } from './utils.js';

// 1. Data Sumber SiJaga Tambak
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

// ==========================================================
// FUNGSI RENDER UTAMA
// ==========================================================
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

// ==========================================================
// INPUT HANDLING & NORMALISASI DATA
// ==========================================================
function readFormData(form) {
    return {
        tanggal: form.tanggal.value.trim(),
        pakanDiberi: form.pakanDiberi.value.trim() === '' ? '' : Number(form.pakanDiberi.value),
        pakanSisa: form.pakanSisa.value.trim() === '' ? '' : Number(form.pakanSisa.value),
        kategori: form.kategori.value,
        setuju: form.setuju.checked
    };
}

// ==========================================================
// 5 ATURAN VALIDASI CLIENT-SIDE (Latihan B)
// ==========================================================
function validateForm(data) {
    const errors = {};

    // Aturan 1: Tanggal wajib diisi dan tidak boleh kosong
    if (!data.tanggal) {
        errors.tanggal = 'Tanggal pencatatan wajib diisi.';
    }

    // Aturan 2: Pakan diberikan minimal 1 kg
    if (data.pakanDiberi === '' || isNaN(data.pakanDiberi) || data.pakanDiberi < 1) {
        errors.pakanDiberi = 'Jumlah pakan diberikan minimal 1 kg.';
    }

    // Aturan 3: Sisa pakan tidak boleh negatif dan tidak boleh lebih besar dari pakan diberikan
    if (data.pakanSisa === '' || isNaN(data.pakanSisa) || data.pakanSisa < 0) {
        errors.pakanSisa = 'Sisa pakan tidak boleh bernilai negatif.';
    } else if (data.pakanSisa > data.pakanDiberi) {
        errors.pakanSisa = 'Sisa pakan tidak boleh melebihi jumlah pakan yang diberikan.';
    }

    // Aturan 4: Kategori kolam wajib dipilih
    if (!data.kategori) {
        errors.kategori = 'Silakan pilih kategori kolam tambak.';
    }

    // Aturan 5: Checkbox persetujuan wajib dicentang
    if (data.setuju !== true) {
        errors.setuju = 'Anda harus mencentang kotak persetujuan sebelum menyimpan.';
    }

    return errors;
}

// ==========================================================
// RENDER ERROR DI DEKAT FIELD & FOKUS KE ERROR PERTAMA
// ==========================================================
function clearErrors() {
    const errorElements = formTambahData.querySelectorAll('.error-text');
    errorElements.forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });

    const inputs = formTambahData.querySelectorAll('input, select');
    inputs.forEach(input => input.classList.remove('input-error'));

    errorSummary.style.display = 'none';
}

function renderErrors(errors) {
    clearErrors();
    let firstErrorField = null;

    for (const [field, message] of Object.entries(errors)) {
        let inputEl = null;
        let errorSmallEl = null;

        if (field === 'tanggal') {
            inputEl = formTambahData.querySelector('#inputTanggal');
            errorSmallEl = formTambahData.querySelector('#errorTanggal');
        } else if (field === 'pakanDiberi') {
            inputEl = formTambahData.querySelector('#inputDiberi');
            errorSmallEl = formTambahData.querySelector('#errorDiberi');
        } else if (field === 'pakanSisa') {
            inputEl = formTambahData.querySelector('#inputSisa');
            errorSmallEl = formTambahData.querySelector('#errorSisa');
        } else if (field === 'kategori') {
            inputEl = formTambahData.querySelector('#inputKategori');
            errorSmallEl = formTambahData.querySelector('#errorKategori');
        } else if (field === 'setuju') {
            inputEl = formTambahData.querySelector('#inputSetuju');
            errorSmallEl = formTambahData.querySelector('#errorSetuju');
        }

        if (inputEl && errorSmallEl) {
            inputEl.classList.add('input-error');
            errorSmallEl.textContent = message;
            errorSmallEl.style.display = 'block';

            if (!firstErrorField) {
                firstErrorField = inputEl;
            }
        }
    }

    // Tampilkan ringkasan error di atas form
    errorSummary.style.display = 'block';

    // Fokus otomatis ke field error pertama (Kunci UX Pertemuan 6)
    if (firstErrorField) {
        firstErrorField.focus();
    }
}

// ==========================================================
// WEB STORAGE: SIMPAN & MUAT DRAFT FORM (Opsional UX)
// ==========================================================
const DRAFT_KEY = 'siJagaTambakFormDraft';

function saveFormDraft() {
    const data = readFormData(formTambahData);
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
}

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

// Simpan draft otomatis saat user mengetik
formTambahData.addEventListener('input', saveFormDraft);

// ==========================================================
// EVENT SUBMIT HANDLER UTAMA
// ==========================================================
formTambahData.addEventListener('submit', (event) => {
    event.preventDefault(); // Mencegah reload halaman bawaan browser

    const data = readFormData(formTambahData);
    const errors = validateForm(data);

    if (Object.keys(errors).length > 0) {
        renderErrors(errors);
        return; // Hentikan proses jika ada error
    }

    // Jika lolos validasi:
    clearErrors();

    try {
        const persentase = hitungKonsumsiPakan(data.pakanDiberi, data.pakanSisa);
        const statusBaru = persentase < 70 ? 'Waspada' : 'Normal';

        const dataBaru = {
            id: Date.now(),
            tanggal: data.tanggal,
            pakanDiberikan: data.pakanDiberi,
            pakanSisa: data.pakanSisa,
            kategori: data.kategori,
            status: statusBaru
        };

        dataTambak.unshift(dataBaru); // Masukkan ke data teratas
        
        const limitAktif = Number(pilihanLimit.value);
        renderDaftarTambak(dataTambak.slice(0, limitAktif));

        formTambahData.reset();
        localStorage.removeItem(DRAFT_KEY); // Hapus draft jika sukses
        
        alert(`Sukses! Data pencatatan tanggal ${data.tanggal} berhasil divalidasi dan disimpan.`);
    } catch (err) {
        alert(`Terjadi kesalahan sistem: ${err.message}`);
    }
});

// ==========================================================
// EVENT PENCARIAN & LIMIT (MODUL 5)
// ==========================================================
inputPencarian.addEventListener('input', (event) => {
    const kataKunci = event.target.value.toLowerCase();
    const limitAktif = Number(pilihanLimit.value);
    
    const dataTerpotong = dataTambak.slice(0, limitAktif);
    const hasilCari = dataTerpotong.filter(item => 
        item.status.toLowerCase().includes(kataKunci) || item.tanggal.includes(kataKunci) || item.kategori.toLowerCase().includes(kataKunci)
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
        
        teksDetail.textContent = `Rincian ${itemTerpilih.kategori} Tanggal ${itemTerpilih.tanggal}: Diberikan ${itemTerpilih.pakanDiberikan}kg, sisa ${itemTerpilih.pakanSisa}kg. (Status: ${itemTerpilih.status})`;
        areaDetail.style.display = 'block';
    }
});

pilihanLimit.value = localStorage.getItem('limitTambak') ?? '6';

pilihanLimit.addEventListener('change', () => {
    localStorage.setItem('limitTambak', pilihanLimit.value);
    inputPencarian.value = ''; 
    document.querySelector('#detail-area').style.display = 'none';
    renderDaftarTambak(dataTambak.slice(0, Number(pilihanLimit.value)));
});

// Load draft saat pertama kali dibuka
loadFormDraft();

// Inisialisasi awal render
renderDaftarTambak(dataTambak.slice(0, Number(pilihanLimit.value)));