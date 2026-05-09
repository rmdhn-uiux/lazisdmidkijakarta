import { motion } from 'framer-motion';

// Data poin-poin misi lembaga
const misi = [
    {
        icon: '📡',
        title: 'Literasi & Penggalangan Dana Digital',
        desc: 'Meliterasi dan menggalang dana Zakat, Infaq, Shadaqah berbasis digital untuk kepentingan kegiatan yang berbasis investasi sosial dan pemberdayaan umat.',
    },
    {
        icon: '🤝',
        title: 'Mitra Strategis',
        desc: 'Menjadi pilihan utama mitra strategis dalam berkolaborasi dan bersinergi menjalankan berbagai kegiatan sosial keagamaan bersama masjid-masjid di DKI Jakarta.',
    },
    {
        icon: '🎓',
        title: 'Peningkatan Kualitas SDM',
        desc: 'Menyediakan program-program untuk peningkatan kualitas sumber daya manusia sehingga mampu melahirkan intelektual dan wirausahawan yang unggul dan handal.',
    },
    {
        icon: '🏪',
        title: 'Penggerak Sektor Riil & UMKM',
        desc: 'Menggerakan sektor riil dan para pelaku UMKM dengan pola supply chain yang berdampak pada pertumbuhan ekonomi masyarakat melalui pemanfaatan dana Zakat, Infaq dan Shodaqoh produktif.',
    },
    {
        icon: '🏢',
        title: 'Pemberdayaan Berbasis Masjid',
        desc: 'Memberdayakan masjid-masjid di DKI Jakarta sebagai pusat kegiatan sosial ekonomi umat Islam yang mandiri dan berkelanjutan.',
    },
];

// Data kebijakan mutu manajemen (M.A.T.A.P)
const mutu = [
    {
        kode: 'M',
        kata: 'MODERN',
        desc: 'Sikap dan cara berfikir serta cara bertindak sesuai dengan tuntutan zaman (wal Akhdzu bil Jadidil Ashlah).',
    },
    {
        kode: 'A',
        kata: 'AKUNTABEL',
        desc: "Pertanggung jawaban terhadap aktivitas kelembagaan dan keuangan yang sesuai dengan undang-undang tentang pengelolaan zakat dan syariah islam.",
    },
    {
        kode: 'T',
        kata: 'TRANSPARAN',
        desc: "Terbuka sesuai dengan prinsip-prinsip yang berlaku dalam undang-undang tentang pengelolaan zakat dan syariah islam yang rahmatan lil 'alamin.",
    },
    {
        kode: 'A',
        kata: 'AMANAH',
        desc: 'Dapat dipercaya dalam pengelolaan dana dari para donatur baik yang berupa dana Zakat, Infaq, Shadaqah CSR, dan Dana Sosial Keagamaan Lainnya.',
    },
    {
        kode: 'P',
        kata: 'PROFESIONAL',
        desc: 'Dalam pengelolaan Zakat, Infaq dan Shodaqoh, Lazis DMI DKI selalu mengedepankan layanan yang terbaik sesuai dengan kesepakatan antar pihak dan etika yang berlaku.',
    },
];

const VisiMisi = () => {
    return (
        <div className="space-y-8">
            {/* ── Hero Banner ── */}
            <div className={`relative rounded-3xl overflow-hidden min-h-[260px] flex items-center bg-gradient-to-br from-primary via-primary-hover to-green-900 shadow-lg`}>
                <div className={`absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]`}></div>
                <div className="relative z-10 px-8 lg:px-12 py-10">
                    <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-4">Visi & Misi</span>
                    <h1 className="text-3xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">Arah & Langkah Strategis</h1>
                    <p className="text-white/90 text-lg max-w-xl leading-relaxed">
                        Panduan perjalanan Lazis DMI DKI Jakarta dalam mewujudkan lembaga filantropi Islam terkemuka
                    </p>
                </div>
            </div>

            {/* ── Visi ── */}
            <section className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100">
                <span className="text-primary font-bold text-xs uppercase tracking-widest mb-3 block text-center">Visi Kami</span>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center">Visi Lazis DMI DKI Jakarta</h2>
                <div className="flex flex-col md:flex-row items-center gap-8 bg-gradient-to-br from-primary/5 to-green-50 p-8 lg:p-12 rounded-3xl border border-primary/10">
                    <div className="text-6xl flex-shrink-0">🌟</div>
                    <blockquote className="text-xl lg:text-2xl font-bold text-primary-hover italic leading-relaxed text-center md:text-left">
                        &quot;Menjadi Lembaga Amil Zakat Terpercaya Berbasis Masjid di DKI Jakarta yang Profesional,
                        Transparan, dan Berdampak Nyata bagi Umat&quot;
                    </blockquote>
                </div>
            </section>

            {/* ── Misi Cards ── */}
            <section className="space-y-6">
                <div className="text-center mb-10">
                    <span className="text-primary font-bold text-xs uppercase tracking-widest mb-3 block">Misi Kami</span>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Langkah-Langkah Strategis</h2>
                    <p className="text-text-muted max-w-2xl mx-auto">
                        Langkah-langkah strategis yang kami tempuh untuk mewujudkan visi lembaga
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {misi.map((m, i) => (
                        <motion.div 
                            whileHover={{ y: -5 }}
                            key={i} 
                            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-green-400"></div>
                            <div className="absolute -top-4 -right-4 text-7xl font-black text-gray-50 group-hover:text-primary/5 transition-colors z-0">
                                0{i + 1}
                            </div>
                            <div className="relative z-10">
                                <div className="text-4xl mb-6">{m.icon}</div>
                                <h4 className="text-lg font-bold text-gray-900 mb-3">{m.title}</h4>
                                <p className="text-text-muted text-sm leading-relaxed">{m.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── Kebijakan Mutu ── */}
            <section className="bg-gradient-to-br from-primary via-primary-hover to-green-900 rounded-3xl p-8 lg:p-12 shadow-xl text-white">
                <div className="text-center mb-12">
                    <span className="text-green-300 font-bold text-xs uppercase tracking-widest mb-3 block">Kebijakan Mutu</span>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-4">Kebijakan Mutu Manajemen</h2>
                    <p className="text-green-100/80 max-w-2xl mx-auto">
                        Lima prinsip utama yang menjadi landasan pengelolaan Lazis DMI DKI Jakarta
                    </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {mutu.map((m, i) => (
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            key={i} 
                            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center"
                        >
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl font-black mb-4 mx-auto">
                                {m.kode}
                            </div>
                            <div className="text-xs font-black tracking-widest text-green-300 mb-3">{m.kata}</div>
                            <p className="text-[10px] lg:text-xs text-white/70 leading-relaxed">{m.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default VisiMisi;
