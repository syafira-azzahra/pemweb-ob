export const hitungKonsumsiPakan = (diberikan, sisa) => {
    if (typeof diberikan !== 'number' || typeof sisa !== 'number') {
        throw new TypeError('Error: Data pakan harus berupa angka.');
    }
    if (sisa > diberikan || sisa < 0) {
        throw new Error('Error Edge Case: Sisa pakan tidak valid (lebih besar dari yang diberikan atau negatif).');
    }
    return ((diberikan - sisa) / diberikan) * 100;
};

export const ringkasDataTambak = (data) => {
    if (!Array.isArray(data)) throw new TypeError('Error: Data harus berupa array object.');
    
    return {
        totalPencatatan: data.length,
        totalPakanKg: data.reduce((sum, item) => sum + item.pakanDiberikan, 0),
        hariWaspada: data.filter(item => item.status !== 'Normal').length
    };
};