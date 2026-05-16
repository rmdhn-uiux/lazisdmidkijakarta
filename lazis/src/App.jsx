import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';

// Import Komponen
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import Halaman
import Beranda from './pages/Beranda';
import Profil from './pages/profil/index';
import Zakat from './pages/zakat/index';
import Program from './pages/Program';
import Layanan from './pages/Layanan';
import Berita from './pages/Berita';
import NotFound from './pages/NotFound';

// Import Halaman Admin
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManagePrograms from './pages/admin/ManagePrograms';
import ManageNews from './pages/admin/ManageNews';
import ManageTransactions from './pages/admin/ManageTransactions';
import ProtectedRoute from './components/admin/ProtectedRoute';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin') || location.pathname === '/login';

  return (
    <>
      {!isAdminPage && <Navbar />}

      {/* Area Konten Utama */}
      <main style={{ minHeight: isAdminPage ? '100vh' : '80vh' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            <Routes location={location}>
              {/* Public Routes */}
              <Route path="/" element={<Beranda />} />
              <Route path="/tentang-kami" element={<Profil subPage="tentang" />} />
              <Route path="/visi-misi" element={<Profil subPage="visimisi" />} />
              <Route path="/susunan-pengurus" element={<Profil subPage="pengurus" />} />
              <Route path="/zakat" element={<Zakat type="zakat" />} />
              <Route path="/kalkulator-zakat" element={<Zakat type="kalkulator" />} />
              <Route path="/edukasi" element={<Zakat type="edukasi" />} />
              <Route path="/infaq" element={<Zakat type="infaq" />} />
              <Route path="/program" element={<Program kategori="donasi" />} />
              <Route path="/program/pendidikan" element={<Program kategori="pendidikan" />} />
              <Route path="/program/kesehatan" element={<Program kategori="kesehatan" />} />
              <Route path="/program/ekonomi" element={<Program kategori="ekonomi" />} />
              <Route path="/program/kemanusiaan" element={<Program kategori="kemanusiaan" />} />
              <Route path="/program/lingkungan" element={<Program kategori="lingkungan" />} />
              <Route path="/kantor-layanan" element={<Layanan subPage="kantor" />} />
              <Route path="/konsultasi" element={<Layanan subPage="konsultasi" />} />
              <Route path="/info-rekening" element={<Layanan subPage="rekening" />} />
              <Route path="/annual-report" element={<Layanan subPage="laporan" />} />
              <Route path="/penerima-manfaat" element={<div className="container py-20"><h2>Halaman Penerima Manfaat</h2></div>} />
              <Route path="/berita" element={<Berita />} />

              {/* Admin Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/admin/programs" element={<ProtectedRoute><ManagePrograms /></ProtectedRoute>} />
              <Route path="/admin/news" element={<ProtectedRoute><ManageNews /></ProtectedRoute>} />
              <Route path="/admin/transactions" element={<ProtectedRoute><ManageTransactions /></ProtectedRoute>} />

              {/* 404 Not Found */}
               <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;