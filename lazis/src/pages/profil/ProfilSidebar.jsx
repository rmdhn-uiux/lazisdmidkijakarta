import { Link, useLocation } from 'react-router-dom';

/**
 * ProfilSidebar
 * Sidebar navigasi bersama untuk semua sub-halaman di /profil.
 * Otomatis menandai link aktif berdasarkan URL saat ini.
 */
const ProfilSidebar = () => {
    const { pathname } = useLocation();

    const links = [
        { to: '/tentang-kami', label: 'Tentang Kami', icon: '📖' },
        { to: '/visi-misi', label: 'Visi & Misi', icon: '🌟' },
        { to: '/susunan-pengurus', label: 'Susunan Pengurus', icon: '👥' },
    ];

    return (
        <aside className="bg-white border border-gray-100 shadow-sm rounded-3xl overflow-hidden sticky top-28">
            <div className="bg-gradient-to-br from-primary to-primary-hover p-6 text-white flex items-center gap-3">
                <span className="text-xl">🕌</span>
                <span className="font-bold tracking-wide">Profil Lembaga</span>
            </div>
            <nav className="flex flex-col">
                {links.map((l) => (
                    <Link
                        key={l.to}
                        to={l.to}
                        className={`flex items-center gap-3 p-4 border-l-4 transition-all ${
                            pathname === l.to 
                            ? 'bg-primary/5 border-primary text-primary font-bold' 
                            : 'border-transparent text-gray-500 hover:bg-gray-50'
                        }`}
                    >
                        <span className="text-xl">{l.icon}</span>
                        <span className="text-sm uppercase tracking-wider">{l.label}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default ProfilSidebar;

