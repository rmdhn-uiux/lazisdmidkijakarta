/**
 * Utility untuk format mata uang Rupiah
 * @param {number} amount - Nominal yang akan diformat
 * @param {boolean} withSymbol - Tambahkan simbol Rp atau tidak (default: true)
 * @returns {string} - String nominal yang sudah terformat
 */
export const formatRp = (amount, withSymbol = true) => {
    if (amount === undefined || amount === null || isNaN(amount)) {
        return withSymbol ? 'Rp 0' : '0';
    }
    
    const formatted = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(amount);

    return withSymbol ? formatted : formatted.replace('Rp', '').trim();
};

/**
 * Utility untuk format angka ribuan
 * @param {number} n - Angka yang akan diformat
 * @returns {string} - Angka dengan pemisah ribuan
 */
export const formatNumber = (n) => {
    return new Intl.NumberFormat('id-ID').format(n);
};
