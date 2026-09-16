// js/utils.js

// Fungsi menghitung persentase pakan menggunakan ES6 Arrow Function
export const hitungKonsumsi = (pakanDiberikan, pakanSisa) => {
    // Error Handling: Validasi logika pakan (Slide 13)
    if (pakanSisa > pakanDiberikan) {
        throw new Error('Data tidak valid: Sisa pakan tidak mungkin lebih besar dari yang diberikan!');
    }
    
    const pakanDimakan = pakanDiberikan - pakanSisa;
    return (pakanDimakan / pakanDiberikan) * 100;
};

// Fungsi memformat peringatan menggunakan Destructuring & Template Literal (Slide 11)
export const formatPeringatan = ({ tanggal, status }) => {
    return `Perhatian untuk tanggal ${tanggal}: Status kolam saat ini "${status}". Segera periksa kondisi air atau udang.`;
};