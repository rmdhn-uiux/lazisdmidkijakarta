import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatRp } from '../../utils/format';
import qrisImage from '../../assets/Qrislazis.jpeg';

const JENIS_ZAKAT = [
    {
        id: 'profesi',
        label: 'Zakat Profesi',
        icon: '👔',
        nisabLabel: `Nisab: ${formatRp(6725000)}/bln`,
        kadar: 0.025,
        fields: [
            { id: 'gaji', label: 'Gaji / Penghasilan per Bulan (Rp)', placeholder: '8000000' },
            { id: 'penghasilan_lain', label: 'Penghasilan Lain per Bulan (Rp)', placeholder: '2000000' },
        ],
        hitung: (f) => {
            const total = (Number(f.gaji) || 0) + (Number(f.penghasilan_lain) || 0);
            const nisab = 6725000;
            return total >= nisab ? { total, zakat: total * 0.025, nisab, lolos: true } : { total, nisab, lolos: false };
        },
    },
    {
        id: 'mal',
        label: 'Zakat Mal',
        icon: '💰',
        nisabLabel: `Nisab: ${formatRp(161500000)}`,
        kadar: 0.025,
        fields: [
            { id: 'tabungan', label: 'Total Tabungan & Deposito (Rp)', placeholder: '200000000' },
            { id: 'investasi', label: 'Nilai Investasi (Rp)', placeholder: '50000000' },
            { id: 'utang', label: 'Utang Jangka Pendek (Rp)', placeholder: '10000000' },
        ],
        hitung: (f) => {
            const total = (Number(f.tabungan) || 0) + (Number(f.investasi) || 0) - (Number(f.utang) || 0);
            const nisab = 161500000;
            return total >= nisab ? { total, zakat: total * 0.025, nisab, lolos: true } : { total, nisab, lolos: false };
        },
    },
    {
        id: 'emas',
        label: 'Zakat Emas',
        icon: '💍',
        nisabLabel: 'Nisab: 85 gram emas',
        kadar: 0.025,
        fields: [
            { id: 'berat_emas', label: 'Berat Emas yang Disimpan (gram)', placeholder: '100' },
            { id: 'harga_emas', label: 'Harga Emas per Gram (Rp)', placeholder: '1900000' },
        ],
        hitung: (f) => {
            const berat = Number(f.berat_emas) || 0;
            const harga = Number(f.harga_emas) || 1900000;
            const total = berat * harga;
            return berat >= 85 ? { total, zakat: total * 0.025, nisab: 85 * harga, lolos: true } : { total, nisab: 85 * harga, lolos: false };
        },
    },
    {
        id: 'fitrah',
        label: 'Zakat Fitrah',
        icon: '🌙',
        nisabLabel: 'Kadar: 2,5 kg beras per jiwa',
        kadar: null,
        fields: [
            { id: 'jiwa', label: 'Jumlah Jiwa yang Ditanggung', placeholder: '4' },
            { id: 'harga_brs', label: 'Harga Beras per Kg (Rp)', placeholder: '14000' },
        ],
        hitung: (f) => {
            const jiwa = Number(f.jiwa) || 1;
            const harga = Number(f.harga_brs) || 14000;
            const zakat = jiwa * 2.5 * harga;
            return { total: jiwa, zakat, nisab: 0, lolos: true };
        },
    },
];

const KalkulatorZakat = () => {
    const [selectedJenis, setSelectedJenis] = useState(JENIS_ZAKAT[0]);
    const [fields, setFields] = useState({});
    const [hasil, setHasil] = useState(null);
    const [showPayment, setShowPayment] = useState(false);
    const [metode, setMetode] = useState('qris');
    const [namaDonatur, setNamaDonatur] = useState('');

    const handleJenisChange = useCallback((jenis) => {
        setSelectedJenis(jenis);
        setFields({});
        setHasil(null);
        setShowPayment(false);
    }, []);

    const handleHitung = () => {
        const isAnyFieldFilled = Object.values(fields).some(val => val !== '');
        if (!isAnyFieldFilled) return alert('Silakan isi data keuangan Anda.');

        const res = selectedJenis.hitung(fields);
        setHasil(res);
        setShowPayment(false);
        
        setTimeout(() => {
            document.getElementById('hasil-kalkulasi')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    };

    const handleKonfirmasiWA = () => {
        if (!namaDonatur.trim()) return alert('Masukkan nama Anda.');
        const nomorWA = '6283899342854';
        const msg = encodeURIComponent(
            `Assalamualaikum, saya konfirmasi pembayaran zakat:\n` +
            `Nama: ${namaDonatur}\nJenis: ${selectedJenis.label}\nTotal: ${formatRp(hasil.zakat)}\nMetode: ${metode.toUpperCase()}`
        );
        window.open(`https://wa.me/${nomorWA}?text=${msg}`, '_blank');
    };

    return (
        <div className="bg-bg min-h-screen py-32">
            <div className="container">
                {/* Hero */}
                <div className="text-center mb-16">
                    <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">Kalkulator</span>
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">Hitung Zakat Anda</h1>
                    <p className="text-text-muted max-w-2xl mx-auto leading-relaxed">Kalkulasikan kewajiban zakat Anda secara akurat dan tunaikan langsung dengan mudah.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-3">
                        <div className="text-sm font-bold text-gray-400 uppercase tracking-widest px-4 mb-4">Pilih Jenis Zakat</div>
                        {JENIS_ZAKAT.map((j) => (
                            <button
                                key={j.id}
                                onClick={() => handleJenisChange(j)}
                                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${selectedJenis.id === j.id ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-100'}`}
                            >
                                <span className="text-2xl">{j.icon}</span>
                                <span className="font-bold text-sm">{j.label}</span>
                            </button>
                        ))}
                    </aside>

                    {/* Calculator Card */}
                    <div className="lg:col-span-8">
                        <motion.div 
                            key={selectedJenis.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-[2.5rem] shadow-xl border border-gray-50 overflow-hidden"
                        >
                            <div className="p-8 lg:p-12 border-b border-gray-50 bg-gray-50/30">
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="text-4xl">{selectedJenis.icon}</span>
                                    <h2 className="text-2xl font-extrabold text-gray-900">{selectedJenis.label}</h2>
                                </div>
                                <p className="text-primary font-bold text-sm">{selectedJenis.nisabLabel}</p>
                            </div>

                            <div className="p-8 lg:p-12 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {selectedJenis.fields.map((f) => (
                                        <div key={f.id} className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-1">{f.label}</label>
                                            <input
                                                type="number"
                                                placeholder={`Rp ${f.placeholder}`}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium"
                                                value={fields[f.id] || ''}
                                                onChange={(e) => setFields(prev => ({ ...prev, [f.id]: e.target.value }))}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <button 
                                    onClick={handleHitung}
                                    className="w-full bg-primary hover:bg-primary-hover text-white py-5 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
                                >
                                    🧮 Hitung Zakat Sekarang
                                </button>

                                {/* Result */}
                                <AnimatePresence>
                                    {hasil && (
                                        <motion.div 
                                            id="hasil-kalkulasi"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="pt-8 border-t border-gray-100"
                                        >
                                            {hasil.lolos ? (
                                                <div className="bg-primary/5 rounded-[2rem] p-8 text-center border border-primary/10">
                                                    <span className="text-sm font-bold text-primary uppercase tracking-widest mb-2 block">Zakat Wajib Tunai</span>
                                                    <div className="text-4xl lg:text-5xl font-black text-primary mb-4">{formatRp(hasil.zakat)}</div>
                                                    <p className="text-gray-500 text-sm mb-8">Berdasarkan data yang Anda masukkan</p>
                                                    <button 
                                                        onClick={() => setShowPayment(true)}
                                                        className="btn-primary px-10 py-4 rounded-full text-base"
                                                    >
                                                        💳 Bayar Sekarang
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="bg-amber-50 rounded-[2rem] p-8 text-center border border-amber-100">
                                                    <span className="text-2xl mb-4 block">⚠️</span>
                                                    <h4 className="font-bold text-amber-900 mb-2">Belum Mencapai Nisab</h4>
                                                    <p className="text-amber-700/80 text-sm leading-relaxed">
                                                        Harta Anda ({formatRp(hasil.total)}) belum mencapai nisab ({formatRp(hasil.nisab)}). 
                                                        Anda tidak wajib zakat, namun tetap dianjurkan bersedekah.
                                                    </p>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Payment */}
                                <AnimatePresence>
                                    {showPayment && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="pt-12 border-t border-gray-100 space-y-8"
                                        >
                                            <div className="text-center">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">Pilih Metode Pembayaran</h3>
                                                <div className="flex justify-center gap-2 p-1 bg-gray-50 rounded-full w-fit mx-auto mt-6">
                                                    <button 
                                                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${metode === 'qris' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`}
                                                        onClick={() => setMetode('qris')}
                                                    >📱 QRIS</button>
                                                    <button 
                                                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${metode === 'transfer' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`}
                                                        onClick={() => setMetode('transfer')}
                                                    >🏦 Transfer</button>
                                                </div>
                                            </div>

                                            {metode === 'qris' ? (
                                                <div className="flex flex-col items-center bg-gray-50 p-10 rounded-[2rem]">
                                                    <div className="w-64 h-64 bg-white p-4 rounded-2xl shadow-sm mb-6 flex items-center justify-center border border-gray-100 overflow-hidden">
                                                        <img src={qrisImage} alt="QRIS Lazis DMI" className="w-full h-full object-contain" />
                                                    </div>
                                                    <p className="text-sm font-bold text-gray-900 mb-1">Lazis DMI DKI Jakarta</p>
                                                    <p className="text-xs text-gray-500">Scan melalui aplikasi m-banking atau e-wallet</p>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    {['BSI', 'BCA', 'Mandiri'].map((b, i) => (
                                                        <div key={i} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm text-center">
                                                            <div className="text-xs font-black text-primary mb-2">{b}</div>
                                                            <div className="text-sm font-bold text-gray-900 mb-1">700.1234.5678</div>
                                                            <div className="text-[10px] text-gray-400">a.n Lazis DMI DKI</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="space-y-4 max-w-md mx-auto">
                                                <label className="text-sm font-bold text-gray-700 ml-1">Nama Lengkap Anda</label>
                                                <input
                                                    type="text"
                                                    placeholder="Contoh: Hamba Allah"
                                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium"
                                                    value={namaDonatur}
                                                    onChange={(e) => setNamaDonatur(e.target.value)}
                                                />
                                                <button 
                                                    onClick={handleKonfirmasiWA}
                                                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all"
                                                >
                                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.673.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                                    Konfirmasi via WhatsApp
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KalkulatorZakat;