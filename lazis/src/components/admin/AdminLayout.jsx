import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logoLazis from '../../assets/logolazisdmi.jpg';

const SidebarContent = ({ menuItems, location, setIsSidebarOpen, logout }) => (
    <>
        <Link to="/" className="p-8 flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={logoLazis} alt="Logo" className="w-10 h-10 rounded-lg object-cover" />
            <span className="text-xl font-black text-primary tracking-tight">Lazis Admin</span>
        </Link>
        
        <nav className="flex-1 px-4 space-y-1 mt-4">
            {menuItems.map((item) => (
                <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm ${
                        location.pathname === item.path
                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-primary'
                    }`}
                >
                    <span>{item.icon}</span>
                    {item.label}
                </Link>
            ))}
        </nav>

        <div className="p-6 mt-auto">
            <button 
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-2xl font-bold text-sm hover:bg-red-100 transition-colors"
            >
                🚪 Keluar
            </button>
        </div>
    </>
);

const AdminLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentYear = new Date().getFullYear();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const logout = () => {
        if (window.confirm('Apakah Anda yakin ingin keluar?')) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
        }
    };

    const menuItems = [
        { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/admin/programs', label: 'Program', icon: '📋' },
        { path: '/admin/news', label: 'Berita', icon: '📰' },
        { path: '/admin/transactions', label: 'Input Manual', icon: '💰' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Desktop */}
            <aside className="hidden lg:flex w-72 bg-white border-r border-gray-200 flex-col fixed h-full z-20">
                <SidebarContent 
                    menuItems={menuItems} 
                    location={location} 
                    setIsSidebarOpen={setIsSidebarOpen} 
                    logout={logout} 
                />
            </aside>

            {/* Sidebar Mobile */}
            <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: isSidebarOpen ? 0 : '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="lg:hidden fixed inset-y-0 left-0 w-72 bg-white shadow-2xl z-40 flex flex-col"
            >
                <SidebarContent 
                    menuItems={menuItems} 
                    location={location} 
                    setIsSidebarOpen={setIsSidebarOpen} 
                    logout={logout} 
                />
            </motion.aside>

            {/* Main Content */}
            <div className="flex-1 lg:ml-72 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl text-gray-500 hover:text-primary transition-colors"
                        >
                            ☰
                        </button>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">
                                {menuItems.find(m => m.path === location.pathname)?.label || 'Admin Panel'}
                            </h2>
                            <p className="hidden sm:block text-[10px] text-gray-400 font-bold uppercase tracking-widest">Selamat Datang, Administrator</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block text-right">
                            <p className="text-sm font-bold text-gray-900">Admin Lazis</p>
                            <p className="text-[10px] text-primary font-bold uppercase">DMI DKI JAKARTA</p>
                        </div>
                        <div className="group relative">
                            <button className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black hover:bg-primary hover:text-white transition-all">
                                A
                            </button>
                            {/* Simple Dropdown on hover for desktop, could be improved */}
                            <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50">
                                <button 
                                    onClick={logout}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-bold text-sm"
                                >
                                    🚪 Keluar
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-6 lg:p-10 flex-1">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                </main>

                {/* Footer */}
                <footer className="py-6 px-10 border-t border-gray-100 bg-white text-center">
                    <p className="text-sm text-gray-500 font-medium">
                        © {currentYear} Lazis DMI DKI Jakarta.
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default AdminLayout;
