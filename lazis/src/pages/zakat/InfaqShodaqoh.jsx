import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatRp } from '../../utils/format';

const NOMINAL_CEPAT = [10000, 25000, 50000, 100000, 250000, 500000];

const KATEGORI = [
    { id: 'umum', icon: '🌿', label: 'Infaq Umum', desc: 'Program pemberdayaan umat sesuai kebutuhan terkini.' },
    { id: 'pendidikan', icon: '📚', label: 'Infaq Pendidikan', desc: 'Mendukung beasiswa dan sarana pendidikan.' },
    { id: 'kesehatan', icon: '🏥', label: 'Infaq Kesehatan', desc: 'Membantu biaya pengobatan warga dhuafa.' },
    { id: 'masjid', icon: '🕌', label: 'Pembangunan Masjid', desc: 'Renovasi dan operasional masjid di Jakarta.' },
    { id: 'kemanusiaan', icon: '🤲', label: 'Kemanusiaan', desc: 'Bantuan darurat untuk korban bencana.' },
    { id: 'ekonomi', icon: '💼', label: 'Pemberdayaan Ekonomi', desc: 'Modal usaha untuk masyarakat prasejahtera.' },
];

const InfaqShodaqoh = () => {
    const [kategori, setKategori] = useState('umum');
    const [nominal, setNominal] = useState('');
    const [namaDonatur, setNamaDonatur] = useState('');
    const [doa, setDoa] = useState('');
    const [showPayment, setShowPayment] = useState(false);
    const [metode, setMetode] = useState('qris');

    const nominalNum = Number(nominal) || 0;
    const katObj = KATEGORI.find((k) => k.id === kategori);

    const handleLanjut = () => {
        if (nominalNum < 1000) return alert(`Minimal ${formatRp(1000)}`);
        setShowPayment(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleKonfirmasiWA = () => {
        if (!namaDonatur.trim()) return alert('Masukkan nama Anda.');
        const nomorWA = '6282117460200';
        const msg = encodeURIComponent(
            `Assalamualaikum, saya konfirmasi Infaq/Shodaqoh:\n` +
            `Nama: ${namaDonatur}\nPeruntukan: ${katObj?.label}\nNominal: ${formatRp(nominalNum)}\nMetode: ${metode.toUpperCase()}`
        );
        window.open(`https://wa.me/${nomorWA}?text=${msg}`, '_blank');
    };

    return (
        <div className="bg-bg min-h-screen py-32">
            <div className="container">
                {/* Hero */}
                <div className="text-center mb-16">
                    <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">Infaq & Shodaqoh</span>
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">Berbagi Kebaikan</h1>
                    <p className="text-text-muted max-w-2xl mx-auto leading-relaxed">Salurkan infaq terbaik Anda untuk memberdayakan umat dan meraih keberkahan harta.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Selection */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="bg-white p-8 lg:p-10 rounded-[2.5rem] shadow-xl border border-gray-50">
                            <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                <span className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-sm">1</span>
                                Pilih Peruntukan Infaq
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {KATEGORI.map((k) => (
                                    <button
                                        key={k.id}
                                        onClick={() => setKategori(k.id)}
                                        className={`text-left p-6 rounded-2xl border-2 transition-all ${kategori === k.id ? 'border-primary bg-primary/5 shadow-md scale-[1.02]' : 'border-gray-100 hover:border-primary/30'}`}
                                    >
                                        <div className="text-3xl mb-4">{k.icon}</div>
                                        <div className="font-bold text-gray-900 mb-1">{k.label}</div>
                                        <p className="text-xs text-gray-500 leading-relaxed">{k.desc}</p>
                                    </button>
                                ))}
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mt-12 mb-8 flex items-center gap-3">
                                <span className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-sm">2</span>
                                Masukkan Nominal
                            </h3>
                            <div className="grid grid-cols-3 gap-3 mb-6">
                                {NOMINAL_CEPAT.map((n) => (
                                    <button
                                        key={n}
                                        onClick={() => setNominal(String(n))}
                                        className={`py-3 rounded-xl text-xs font-bold transition-all border ${nominalNum === n ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white text-gray-600 border-gray-100 hover:border-primary/50'}`}
                                    >
                                        {formatRp(n)}
                                    </button>
                                ))}
                            </div>
                            <input
                                type="number"
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 outline-none font-bold text-xl text-primary"
                                placeholder="Nominal Lain (Rp)"
                                value={nominal}
                                onChange={(e) => setNominal(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="lg:col-span-5">
                        <div className="bg-white p-8 lg:p-10 rounded-[2.5rem] shadow-xl border border-gray-50 sticky top-32">
                            <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                <span className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-sm">3</span>
                                Data Donatur
                            </h3>
                            
                            <div className="space-y-6">
                                <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                                    <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Total Infaq</div>
                                    <div className="text-3xl font-black text-primary">{formatRp(nominalNum)}</div>
                                    <div className="text-[10px] text-gray-500 mt-1 uppercase font-bold">{katObj?.label}</div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Nama Donatur</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                                        placeholder="Nama / Hamba Allah"
                                        value={namaDonatur} 
                                        onChange={(e) => setNamaDonatur(e.target.value)} 
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Doa / Pesan (Opsional)</label>
                                    <textarea 
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none" 
                                        rows={3}
                                        placeholder="Tulis doa atau harapan Anda..."
                                        value={doa} 
                                        onChange={(e) => setDoa(e.target.value)} 
                                    />
                                </div>

                                <button 
                                    className="w-full bg-primary hover:bg-primary-hover text-white py-5 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 transition-all disabled:opacity-50 disabled:grayscale"
                                    disabled={nominalNum < 1000}
                                    onClick={handleLanjut}
                                >
                                    Lanjutkan Infaq
                                </button>
                            </div>

                            <AnimatePresence>
                                {showPayment && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="mt-8 pt-8 border-t border-gray-100 space-y-6"
                                    >
                                        <div className="flex justify-center gap-2 p-1 bg-gray-50 rounded-full w-fit mx-auto">
                                            <button className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${metode === 'qris' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`} onClick={() => setMetode('qris')}>📱 QRIS</button>
                                            <button className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${metode === 'transfer' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`} onClick={() => setMetode('transfer')}>🏦 Transfer</button>
                                        </div>

                                        {metode === 'qris' ? (
                                            <div className="flex flex-col items-center">
                                                <div className="w-40 h-40 bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex items-center justify-center font-black text-primary italic mb-4">QRIS</div>
                                                <p className="text-[10px] text-gray-500 text-center">Scan melalui m-banking atau e-wallet</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                {['BSI', 'BCA'].map((b, i) => (
                                                    <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                        <span className="text-xs font-black text-primary">{b}</span>
                                                        <span className="text-sm font-bold text-gray-900 tracking-wider">700.1234.5678</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <button 
                                            onClick={handleKonfirmasiWA}
                                            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all text-sm"
                                        >
                                            Konfirmasi via WhatsApp
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfaqShodaqoh;