import { motion } from 'framer-motion';

// Data statistik lembaga
const stats = [
    { value: '10+', label: 'Tahun Berpengalaman' },
    { value: '50rb+', label: 'Penerima Manfaat' },
    { value: '34', label: 'Kab/Kota Terjangkau' },
    { value: '200+', label: 'Program Tersalurkan' },
];

// Data timeline perjalanan lembaga
const timeline = [
    {
        year: '2010',
        title: 'Pendirian Lazis DMI DKI',
        desc: 'Lazis DMI DKI Jakarta lahir sebagai amanat Pimpinan Wilayah DMI DKI Jakarta untuk menghimpun dan menyalurkan Zakat, Infaq dan Shodaqoh di wilayah DKI Jakarta.',
    },
    {
        year: '2013',
        title: 'Pengukuhan Formal',
        desc: 'Secara yuridis formal dikukuhkan melalui surat keputusan resmi sebagai lembaga amil zakat tingkat provinsi yang sah dan terpercaya.',
    },
    {
        year: '2016',
        title: 'Izin Operasional Resmi',
        desc: 'Mendapat izin operasional resmi sebagai LAZ tingkat provinsi dan mulai memperluas jaringan penyaluran ke seluruh kabupaten/kota DKI Jakarta.',
    },
    {
        year: '2019',
        title: 'Standar Manajemen Mutu',
        desc: 'Menerapkan standar manajemen mutu berbasis teknologi informasi untuk transparansi dan akuntabilitas pengelolaan dana Zakat, Infaq dan Shodaqoh.',
    },
    {
        year: '2021',
        title: 'Satgas Peduli Covid-19',
        desc: 'Pembentukan satuan tugas peduli Covid-19 untuk membantu masyarakat DKI Jakarta yang terdampak pandemi melalui penyaluran sembako dan bantuan tunai.',
    },
    {
        year: '2024',
        title: 'Ekspansi & Inovasi Digital',
        desc: 'Pengembangan platform digital Zakat, Infaq dan Shodaqoh untuk mempermudah donatur dan meningkatkan jangkauan program pemberdayaan umat di seluruh DKI Jakarta.',
    },
];

// Data legalitas lembaga
const legalitas = [
    { label: 'SK Kementerian Agama', value: 'SK KEMENAG NO. 255/2016' },
    { label: 'NPWP', value: '73.XXX.XXX.X-XXX.000' },
    { label: 'Alamat Kantor Pusat', value: 'Jl. Matraman Raya No. 126, Jakarta Timur 13140' },
    { label: 'Kontak', value: '(021) 8580-XXX / lazisdmidki@gmail.com' },
];

const TentangKami = () => {
    return (
        <div className="space-y-8">
            {/* ── Hero Banner ── */}
            <div className={`relative rounded-3xl overflow-hidden min-h-[260px] flex items-center bg-gradient-to-br from-primary via-primary-hover to-green-900 shadow-lg`}>
                <div className={`absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]`}></div>
                <div className="relative z-10 px-8 lg:px-12 py-10">
                    <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-4">Tentang Kami</span>
                    <h1 className="text-3xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">LAZIS DMI DKI Jakarta</h1>
                    <p className="text-white/90 text-lg max-w-xl leading-relaxed">
                        Lembaga Amil Zakat Infaq dan Shadaqah Dewan Masjid Indonesia DKI Jakarta
                    </p>
                </div>
            </div>

            {/* ── Deskripsi Utama ── */}
            <section className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100">
                <span className="text-primary font-bold text-xs uppercase tracking-widest mb-3 block">Mengenal Kami</span>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Mengenal Lazis DMI DKI Jakarta</h2>
                <blockquote className="border-l-4 border-primary bg-primary/5 p-6 rounded-r-2xl text-primary-hover italic text-lg leading-relaxed mb-8">
                    &quot;Lembaga Amil Zakat Infaq dan Shadaqah Dewan Masjid Indonesia (Lazis DMI) DKI Jakarta
                    merupakan badan resmi DMI Provinsi DKI Jakarta yang memiliki tugas dan fungsi menghimpun
                    dan menyalurkan zakat, infaq dan shadaqah serta sebagai pemberdaya masyarakat di tingkat
                    provinsi DKI Jakarta.&quot;
                </blockquote>
                <ul className="space-y-4">
                    {[
                        'Mengkoordinasi Lazis DMI Kabupaten/Kota dalam mencapai target penghimpunan Zakat, Infaq dan Shodaqoh di DKI Jakarta',
                        'Mengorganisir gerakan pengumpulan zakat tingkat provinsi secara profesional dan transparan',
                        'Mengoptimalkan pendistribusian dan pendayagunaan zakat untuk pengentasan kemiskinan dan peningkatan kesejahteraan',
                        'Menerapkan sistem manajemen keuangan yang transparan dan akuntabel berbasis teknologi informasi dan komunikasi'
                    ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-700 pb-4 border-b border-gray-50 last:border-0">
                            <span className="text-primary font-bold">✓</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* ── Stats Counter ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                    <motion.div 
                        whileHover={{ y: -5 }}
                        key={i} 
                        className="bg-gradient-to-br from-primary to-primary-hover rounded-2xl p-6 text-center text-white shadow-md"
                    >
                        <div className="text-2xl lg:text-3xl font-extrabold mb-1">{s.value}</div>
                        <div className="text-xs text-white/80 font-medium uppercase tracking-wider">{s.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* ── Timeline Perjalanan ── */}
            <section className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100">
                <span className="text-primary font-bold text-xs uppercase tracking-widest mb-3 block">Perjalanan Kami</span>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-10">Sejarah & Milestone</h2>
                
                <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                    {timeline.map((item, i) => (
                        <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                <svg className="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                    <path d="M8 0a8 8 0 1 0 8 8A8.009 8.009 0 0 0 8 0zm0 14.5A6.5 6.5 0 1 1 14.5 8 6.507 6.507 0 0 1 8 14.5z" />
                                    <path d="M10.5 7.5H9V4.5a.5.5 0 0 0-1 0v3.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 0-1z" />
                                </svg>
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm transition-all group-hover:bg-white group-hover:shadow-md">
                                <div className="flex items-center justify-between space-x-2 mb-2">
                                    <div className="font-bold text-primary bg-primary/10 px-3 py-1 rounded-full text-xs">{item.year}</div>
                                </div>
                                <h4 className="text-gray-900 font-bold mb-2">{item.title}</h4>
                                <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Legalitas ── */}
            <section className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100">
                <span className="text-primary font-bold text-xs uppercase tracking-widest mb-3 block">Legalitas & Perizinan</span>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">Legalitas Lembaga</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {legalitas.map((item, i) => (
                        <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-primary/5 transition-colors">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl">📋</div>
                            <div>
                                <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">{item.label}</div>
                                <div className="text-gray-900 font-semibold">{item.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default TentangKami;
