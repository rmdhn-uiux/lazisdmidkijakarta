import { motion } from 'framer-motion';

// Komponen avatar SVG (tidak perlu gambar eksternal)
const AvatarPlaceholder = ({ size = 96 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="rounded-full shadow-inner"
        aria-label="Foto pengurus"
    >
        <rect width="100" height="100" fill="#f0fdf4" />
        <circle cx="50" cy="38" r="18" fill="#86efac" />
        <ellipse cx="50" cy="80" rx="28" ry="20" fill="#86efac" />
    </svg>
);

// Data pembina (Ketua PW DMI DKI)
const pimpinan = {
    nama: 'Pimpinan Wilayah DMI DKI',
    jabatan: 'Ketua Pimpinan Wilayah DMI DKI Jakarta',
    desc: 'Pimpinan tertinggi organisasi Dewan Masjid Indonesia Provinsi DKI Jakarta yang membawahi seluruh kegiatan lembaga termasuk Lazis DMI DKI Jakarta.',
};

// Data pengurus harian
const pengurusUtama = [
    {
        nama: 'Ketua Umum',
        jabatan: 'Ketua Umum Lazis DMI DKI Jakarta',
        desc: 'Bertanggung jawab atas keseluruhan operasional dan program Lazis DMI DKI Jakarta.',
    },
    {
        nama: 'Sekretaris Umum',
        jabatan: 'Sekretaris Umum Lazis DMI DKI Jakarta',
        desc: 'Mengelola administrasi, dokumentasi, dan koordinasi internal lembaga.',
    },
    {
        nama: 'Bendahara Umum',
        jabatan: 'Bendahara Umum Lazis DMI DKI Jakarta',
        desc: 'Bertanggung jawab atas pengelolaan keuangan dan pelaporan keuangan lembaga.',
    },
];

const SusunanPengurus = () => {
    return (
        <div className="space-y-8">
            {/* ── Hero Banner ── */}
            <div className={`relative rounded-3xl overflow-hidden min-h-[260px] flex items-center bg-gradient-to-br from-primary via-primary-hover to-green-900 shadow-lg`}>
                <div className={`absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]`}></div>
                <div className="relative z-10 px-8 lg:px-12 py-10">
                    <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-4">Susunan Pengurus</span>
                    <h1 className="text-3xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">Pimpinan & Pengurus</h1>
                    <p className="text-white/90 text-lg max-w-xl leading-relaxed">
                        Pimpinan dan pengelola utama Lazis DMI DKI Jakarta
                    </p>
                </div>
            </div>

            {/* ── Pembina: Ketua PW DMI DKI ── */}
            <section className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100">
                <span className="text-primary font-bold text-xs uppercase tracking-widest mb-3 block">Pembina</span>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">Ketua Pimpinan Wilayah</h2>
                
                <div className="flex flex-col md:flex-row items-center gap-8 bg-gradient-to-br from-primary/5 to-green-50 p-8 rounded-3xl border border-primary/10">
                    <div className="relative flex-shrink-0">
                        <AvatarPlaceholder size={140} />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-tighter px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                            Pembina Utama
                        </div>
                    </div>
                    <div className="text-center md:text-left">
                        <div className="text-2xl font-extrabold text-gray-900 mb-1">{pimpinan.nama}</div>
                        <div className="text-primary font-bold mb-4">{pimpinan.jabatan}</div>
                        <p className="text-text-muted leading-relaxed max-w-2xl">{pimpinan.desc}</p>
                    </div>
                </div>
            </section>

            {/* ── Pengurus Harian ── */}
            <section className="space-y-6">
                <div className="text-center mb-10">
                    <span className="text-primary font-bold text-xs uppercase tracking-widest mb-3 block">Pengurus</span>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Pengurus Harian Lembaga</h2>
                    <p className="text-text-muted max-w-2xl mx-auto">
                        Pengurus yang bertanggung jawab atas pengelolaan operasional Lazis DMI DKI Jakarta
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {pengurusUtama.map((p, i) => (
                        <motion.div 
                            whileHover={{ y: -5 }}
                            key={i} 
                            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center flex flex-col items-center"
                        >
                            <div className="mb-6">
                                <AvatarPlaceholder size={100} />
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">{p.nama}</h4>
                            <div className="bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                                {p.jabatan}
                            </div>
                            <p className="text-text-muted text-sm leading-relaxed">{p.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default SusunanPengurus;
