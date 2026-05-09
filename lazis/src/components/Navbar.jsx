import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  // Close mobile menu on route change
  const [lastPathname, setLastPathname] = useState(location.pathname);
  if (location.pathname !== lastPathname) {
    setLastPathname(location.pathname);
    setIsOpen(false);
    setActiveDropdown(null);
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    {
      title: 'Profil',
      items: [
        { label: 'Tentang Kami', to: '/tentang-kami' },
        { label: 'Visi & Misi', to: '/visi-misi' },
        { label: 'Susunan Pengurus', to: '/susunan-pengurus' },
      ]
    },
    {
      title: 'Zakat & Infaq',
      items: [
        { label: 'Bayar Zakat', to: '/zakat' },
        { label: '🧮 Kalkulator Zakat', to: '/kalkulator-zakat' },
        { label: 'Infaq & Shodaqoh', to: '/infaq' },
        { label: 'Edukasi Zakat', to: '/edukasi' },
      ]
    },
    {
      title: 'Program',
      items: [
        { label: 'Semua Program', to: '/program' },
        { label: '🎓 Pendidikan', to: '/program/pendidikan' },
        { label: '🏥 Kesehatan', to: '/program/kesehatan' },
        { label: '💼 Ekonomi', to: '/program/ekonomi' },
        { label: '🤝 Kemanusiaan', to: '/program/kemanusiaan' },
        { label: '🌱 Lingkungan', to: '/program/lingkungan' },
      ]
    },
    {
      title: 'Layanan',
      items: [
        { label: 'Kantor Layanan', to: '/kantor-layanan' },
        { label: 'Konsultasi ZIS', to: '/konsultasi' },
        { label: 'Info Rekening', to: '/info-rekening' },
        { label: 'Laporan Tahunan', to: '/annual-report' },
      ]
    }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-md py-3' : 'bg-white/90 py-5'}`}>
      <div className="container flex items-center justify-between">
        <Link className="flex items-center gap-2" to="/">
          <span className="text-2xl font-bold text-primary tracking-tight">Lazis DMI DKI</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((group, idx) => (
            <div 
              key={idx} 
              className="relative group"
              onMouseEnter={() => setActiveDropdown(idx)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="px-4 py-2 text-sm font-medium text-text-muted hover:text-primary hover:bg-primary/5 rounded-lg transition-colors flex items-center gap-1">
                {group.title}
                <svg className={`w-4 h-4 transition-transform ${activeDropdown === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {activeDropdown === idx && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-1 w-56 bg-white border border-gray-100 shadow-xl rounded-xl p-2 z-50"
                  >
                    {group.items.map((item, i) => (
                      <NavLink 
                        key={i} 
                        to={item.to}
                        className={({ isActive }) => `block px-4 py-2.5 text-sm font-medium rounded-lg transition-all hover:translate-x-1 ${isActive ? 'bg-primary/5 text-primary' : 'text-gray-700 hover:bg-primary/5 hover:text-primary'}`}
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <NavLink to="/berita" className={({ isActive }) => `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isActive ? 'text-primary bg-primary/5' : 'text-text-muted hover:text-primary hover:bg-primary/5'}`}>
            Berita
          </NavLink>
          
          <div className="ml-4 pl-4 border-l border-gray-100">
            <Link to="/program" className="btn-primary px-6 py-2.5 rounded-full text-sm font-bold shadow-sm inline-flex items-center justify-center">
              Donasi Sekarang
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t border-gray-50 overflow-hidden"
          >
            <div className="container py-6 flex flex-col gap-4">
              {navLinks.map((group, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2">{group.title}</div>
                  {group.items.map((item, i) => (
                    <NavLink 
                      key={i} 
                      to={item.to}
                      className={({ isActive }) => `px-4 py-2 rounded-lg text-base font-medium ${isActive ? 'bg-primary/5 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              ))}
              <NavLink to="/berita" className="px-4 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50">Berita</NavLink>
              <Link to="/program" className="btn-primary w-full py-3 rounded-xl mt-4">
                Donasi Sekarang
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;