import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-bg">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-6"
      >
        <div className="text-9xl font-black text-primary/20 mb-4">404</div>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Halaman Tidak Ditemukan</h1>
        <p className="text-text-muted text-lg mb-10 max-w-md mx-auto">
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            to="/" 
            className="btn-primary rounded-full px-8 py-3 text-base"
          >
            Kembali ke Beranda
          </Link>
          <Link 
            to="/program" 
            className="btn-outline-success rounded-full px-8 py-3 text-base"
          >
            Lihat Program
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default NotFound;
