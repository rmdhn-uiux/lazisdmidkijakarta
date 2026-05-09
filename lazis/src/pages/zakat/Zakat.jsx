/**
 * Zakat.jsx — Halaman utama Zakat
 */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatRp } from '../../utils/format';

const jenisZakat = [
    {
        icon: '💰',
        judul: 'Zakat Mal',
        desc: 'Zakat atas harta kekayaan yang telah memenuhi syarat nisab and haul selama satu tahun.',
        nisab: '85 gr emas',
        kadar: '2,5%',
    },
    {
        icon: '👔',
        judul: 'Zakat Profesi',
        desc: 'Zakat wajib atas penghasilan dari pekerjaan atau profesi yang telah mencapai nisab.',
        nisab: `${formatRp(6725000)}/bln`,
        kadar: '2,5%',
    },
    {
        icon: '💍',
        judul: 'Zakat Emas & Perak',
        desc: 'Zakat atas kepemilikan emas dan perak yang disimpan sebagai aset dan telah mencapai haul.',
        nisab: '85 gr emas',
        kadar: '2,5%',
    },
    {
        icon: '🛒',
        judul: 'Zakat Perdagangan',
        desc: 'Zakat atas harta usaha atau barang dagangan yang diperjualbelikan untuk memperoleh keuntungan.',
        nisab: '85 gr emas',
        kadar: '2,5%',
    },
    {
        icon: '🌾',
        judul: 'Zakat Pertanian',
        desc: 'Zakat atas hasil pertanian seperti padi, jagung, dan hasil tanaman pangan lainnya.',
        nisab: '653 kg beras',
        kadar: '5-10%',
    },
    {
        icon: '📈',
        judul: 'Zakat Saham',
        desc: 'Zakat wajib atas kepemilikan saham apabila telah memenuhi nisab and haul satu tahun.',
        nisab: '85 gr emas',
        kadar: '2,5%',
    },
    {
        icon: '🐄',
        judul: 'Zakat Peternakan',
        desc: 'Zakat yang wajib dikeluarkan atas kepemilikan hewan ternak seperti sapi, kambing, dan unta.',
        nisab: 'Sesuai jenis ternak',
        kadar: 'Bervariasi',
    },
    {
        icon: '🏢',
        judul: 'Zakat Perusahaan',
        desc: 'Zakat atas keuntungan usaha atau badan usaha yang dimiliki individu maupun lembaga.',
        nisab: '85 gr emas',
        kadar: '2,5%',
    },
    {
        icon: '🏠',
        judul: 'Zakat Properti',
        desc: 'Zakat atas hasil pengelolaan aset properti seperti rumah kontrakan, kos, atau gedung sewaan.',
        nisab: '85 gr emas',
        kadar: '2,5%',
    },
    {
        icon: '🌙',
        judul: 'Zakat Fitrah',
        desc: 'Zakat wajib bagi setiap Muslim yang ditunaikan pada bulan Ramadan sebelum Salat Idulfitri.',
        nisab: 'Setiap Muslim',
        kadar: '2,5 kg beras',
    },
];

const keunggulan = [
    { icon: '🛡️', judul: 'Terpercaya & Amanah', desc: 'Dikelola oleh Lazis DMI DKI yang dibina langsung oleh DMI Provinsi DKI Jakarta.' },
    { icon: '🎯', judul: 'Tepat Sasaran', desc: 'Zakat disalurkan kepada 8 golongan yang berhak menerima sesuai ketentuan syariat Islam.' },
    { icon: '📊', judul: 'Transparan & Akuntabel', desc: 'Laporan keuangan dan penyaluran zakat dapat diakses dan dipertanggungjawabkan secara terbuka.' },
    { icon: '🕌', judul: 'Berbasis Masjid', desc: 'Program bersinergi dengan masjid-masjid se-DKI Jakarta untuk pemerataan distribusi zakat.' },
];

const ZakatPage = () => (
    <div className="bg-bg min-h-screen">
        {/* ── Hero ── */}
        <section className="relative bg-gradient-to-br from-primary via-primary-hover to-green-900 pt-32 pb-20 overflow-hidden">
            <div className={`absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]`}></div>
            <div className="container relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-2/3 text-white">
                        <motion.span 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-6"
                        >
                            Zakat
                        </motion.span>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight"
                        >
                            Tunaikan <span className="text-secondary">Zakat</span> Anda<br />Bersama Lazis DMI DKI
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-white/90 mb-10 max-w-xl leading-relaxed"
                        >
                            Salurkan zakat Anda melalui Lazis DMI DKI Jakarta — lembaga resmi berbasis masjid yang transparan, amanah, dan tepat sasaran untuk memberdayakan umat.
                        </motion.p>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-4"
                        >
                            <Link to="/kalkulator-zakat" className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-full font-bold shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                                🧮 Hitung Zakat Saya
                            </Link>
                            <a href="#jenis-zakat" className="border-2 border-white/50 hover:border-white text-white px-8 py-4 rounded-full font-bold transition-all hover:bg-white/10">
                                Jenis-Jenis Zakat
                            </a>
                        </motion.div>
                    </div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="lg:w-1/3 w-full"
                    >
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-white shadow-2xl">
                            <h3 className="text-xl font-bold mb-6 text-center">Info Nisab Zakat 2025</h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Harga Emas (per gram)', val: formatRp(1900000) },
                                    { label: 'Nisab Zakat Mal', val: formatRp(161500000) },
                                    { label: 'Nisab Zakat Profesi', val: `${formatRp(6725000)}/bln` },
                                    { label: 'Kadar Zakat', val: '2,5%' },
                                ].map((r, i) => (
                                    <div key={i} className="flex justify-between items-center py-3 border-b border-white/10 last:border-0 text-sm">
                                        <span className="text-white/70">{r.label}</span>
                                        <span className="font-bold text-secondary">{r.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>

        {/* ── Mengapa Lazis DMI DKI ── */}
        <section className="py-24 bg-white">
            <div className="container">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold text-xs uppercase tracking-widest mb-3 block">Keunggulan Kami</span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Mengapa Zakat di Lazis DMI DKI?</h2>
                    <p className="text-text-muted">Amanah dalam menerima, tepat dalam menyalurkan</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {keunggulan.map((k, i) => (
                        <motion.div 
                            whileHover={{ y: -5 }}
                            key={i} 
                            className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center hover:bg-white hover:shadow-xl transition-all"
                        >
                            <div className="text-5xl mb-6">{k.icon}</div>
                            <h4 className="text-lg font-bold text-gray-900 mb-3">{k.judul}</h4>
                            <p className="text-text-muted text-sm leading-relaxed">{k.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* ── Jenis Zakat ── */}
        <section className="py-24 bg-primary/5" id="jenis-zakat">
            <div className="container">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold text-xs uppercase tracking-widest mb-3 block">Panduan Zakat</span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Jenis-Jenis Zakat</h2>
                    <p className="text-text-muted">Kenali jenis zakat yang wajib anda tunaikan</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {jenisZakat.map((z, i) => (
                        <motion.div 
                            whileHover={{ y: -5 }}
                            key={i} 
                            className="bg-white p-6 rounded-3xl shadow-sm border-t-4 border-primary hover:shadow-md transition-all flex flex-col h-full"
                        >
                            <div className="text-4xl mb-4">{z.icon}</div>
                            <h4 className="text-base font-bold text-gray-900 mb-3">{z.judul}</h4>
                            <p className="text-xs text-text-muted leading-relaxed mb-6 flex-grow">{z.desc}</p>
                            <div className="space-y-2">
                                <div className="text-[10px] font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-full inline-block w-full">Nisab: {z.nisab}</div>
                                <div className="text-[10px] font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-full inline-block w-full">Kadar: {z.kadar}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20">
            <div className="container">
                <div className="bg-gradient-to-r from-primary to-green-800 rounded-[3rem] p-12 text-center text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Sudah Tahu Berapa Zakat Anda? 🧮</h2>
                        <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
                            Gunakan kalkulator zakat kami untuk menghitung dengan mudah, lalu bayar langsung via QRIS atau transfer bank.
                        </p>
                        <Link to="/kalkulator-zakat" className="bg-secondary text-primary hover:opacity-90 px-10 py-5 rounded-full font-bold text-lg shadow-xl inline-block transition-all hover:scale-105 active:scale-95">

                            Hitung & Bayar Zakat Sekarang
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    </div>
);

export default ZakatPage;
