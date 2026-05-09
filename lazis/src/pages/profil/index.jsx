/**
 * index.jsx  —  src/pages/profil/index.jsx
 * Entry point untuk semua sub-halaman Profil.
 *
 * Menyatukan ProfilSidebar + halaman yang sesuai,
 * dan menyuntikkan CSS terpusat dari profilStyles.js.
 *
 * Cara pakai di App.jsx:
 *   import Profil from './pages/profil';
 *   <Route path="/tentang-kami"      element={<Profil subPage="tentang"  />} />
 *   <Route path="/visi-misi"         element={<Profil subPage="visimisi" />} />
 *   <Route path="/susunan-pengurus"  element={<Profil subPage="pengurus" />} />
 */

import ProfilSidebar from './ProfilSidebar';
import TentangKami from './TentangKami';
import VisiMisi from './VisiMisi';
import SusunanPengurus from './SusunanPengurus';
import { motion, AnimatePresence } from 'framer-motion';

const Profil = ({ subPage }) => {
    // Pilih komponen halaman berdasarkan subPage prop
    const renderPage = () => {
        switch (subPage) {
            case 'tentang': return <TentangKami />;
            case 'visimisi': return <VisiMisi />;
            case 'pengurus': return <SusunanPengurus />;
            default: return <TentangKami />;
        }
    };

    return (
        <div className="bg-bg py-20 min-h-screen">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <ProfilSidebar />
                    </div>
                    <div className="lg:col-span-3">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={subPage}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {renderPage()}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profil;

