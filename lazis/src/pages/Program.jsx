import { useState, useEffect } from 'react';
import ProgramCard from '../components/ProgramCard';
import { motion } from 'framer-motion';
import { getPrograms } from '../api';

const Program = ({ kategori }) => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await getPrograms();
        setPrograms(response.data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  // Filter: Jika kategori 'donasi' (semua), tampilkan semua. Jika tidak, filter berdasarkan kategori.
  const filtered = kategori === 'donasi' || !kategori
    ? programs 
    : programs.filter(p => p.category === kategori);

  const getTitle = () => {
    if (!kategori || kategori === 'donasi') return 'Semua Program Kebaikan';
    return `Program ${kategori.charAt(0).toUpperCase() + kategori.slice(1)}`;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-bg min-h-screen">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold uppercase tracking-widest text-xs mb-3 block">Daftar Program</span>
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">{getTitle()}</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Salurkan donasi terbaik Anda untuk program-program pemberdayaan umat bersama Lazis DMI DKI Jakarta.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.length > 0 ? filtered.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={item.id}
            >
              <ProgramCard 
                id={item.id}
                title={item.title}
                category={item.category}
                target={item.target}
                collected={item.collected}
              />
            </motion.div>
          )) : (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
               <div className="text-6xl mb-4">🔍</div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">Program Tidak Ditemukan</h3>
               <p className="text-text-muted">Belum ada program aktif di kategori ini.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Program;