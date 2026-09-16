// js/utils.js

export function ringkasInventaris(data) {
    if (!Array.isArray(data)) throw new TypeError('Data harus array');
    
    return {
        totalJenisAlat: data.length,
        totalUnitKeseluruhan: data.reduce((total, item) => total + item.jumlah, 0),
        jumlahAlatRusak: data.filter(item => item.kondisi !== 'Baik').length
    };
}

export function cariAlatById(data, idDicari) {
    const hasil = data.find(item => item.id === idDicari);
    if (!hasil) throw new Error(`Alat dengan ID ${idDicari} tidak ditemukan!`);
    return hasil;
}