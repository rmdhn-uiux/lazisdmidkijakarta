import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatRp } from '../utils/format';
import ProgramCard from '../components/ProgramCard';
import { motion } from 'framer-motion';
import { getPrograms } from '../api';

const Beranda = () => {
  const [featuredPrograms, setFeaturedPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await getPrograms();
        setFeaturedPrograms(response.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching featured programs:", error);
      }
    };
    fetchPrograms();
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-white">
        {/* Background Gradient */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_10%_20%,_var(--color-bg)_0%,_#ffffff_90%)]"></div>
        
        {/* Decorative SVG */}
        <div className="absolute top-20 -right-20 opacity-10 hidden lg:block rotate-12">
            <svg width="600" height="600" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="var(--color-primary)" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.2,-19.2,95.8,-5.2C93.5,8.9,82,22.1,70.6,33.2C59.1,44.2,47.7,53.2,35.2,60.6C22.7,68.1,9.1,74,-3.8,80.6C-16.7,87.1,-28.9,94.4,-40.2,89.5C-51.5,84.7,-61.9,67.7,-69.9,50.7C-77.9,33.7,-83.5,16.8,-81.4,1.2C-79.3,-14.4,-69.5,-28.7,-58.5,-40.4C-47.5,-52.1,-35.3,-61.1,-22.3,-69.3C-9.3,-77.5,4.5,-84.9,17.8,-83.3C31.1,-81.7,43.9,-71.1,44.7,-76.4Z" transform="translate(100 100)" />
            </svg>
        </div>

        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6"
              >
                ✨ Lembaga Amil Zakat Terpercaya
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-6"
              >
                Menebar Kebaikan, <br />
                <span className="text-primary relative inline-block">
                   Memuliakan Umat
                   <svg className="absolute -bottom-2 left-0 w-full opacity-30" height="10" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.00025 7.00005C29.6231 3.52295 106.333 -1.82137 198.001 3.50005" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                   </svg>
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-gray-600 mb-10 lg:pr-10 leading-relaxed"
              >
                Salurkan zakat, infaq, dan sedekah Anda melalui Lazis DMI DKI Jakarta. 
                Kami memastikan amanah Anda sampai kepada yang berhak dengan profesional dan transparan.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/zakat" className="btn-primary rounded-full px-8 py-4 text-base shadow-xl hover:scale-105 active:scale-95">
                  Bayar Zakat Sekarang
                </Link>
                <Link to="/program" className="btn-outline-success rounded-full px-8 py-4 text-base">
                  Lihat Program
                </Link>
              </motion.div>
              
              <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-100">
                 <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-1">15rb+</h4>
                    <p className="text-gray-500 text-sm">Donatur</p>
                 </div>
                 <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-1">850+</h4>
                    <p className="text-gray-500 text-sm">Penerima</p>
                 </div>
                 <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-1">100%</h4>
                    <p className="text-gray-500 text-sm">Transparan</p>
                 </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                  {/* Decorative blur */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 rounded-full blur-[100px] -z-10"></div>
                  
                  <div className="relative z-10 p-2 bg-white rounded-3xl shadow-2xl rotate-[-2deg]">
                    <img 
                      src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=800" 
                      className="w-full h-auto rounded-2xl" 
                      alt="Kegiatan Sosial" 
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Floating Info Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 hidden md:flex items-center gap-4 border border-gray-50"
                  >
                     <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                        ✓
                     </div>
                     <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">Tersalurkan</p>
                        <p className="text-lg font-bold text-primary">{formatRp(1200000000)}</p>
                     </div>
                  </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                  { icon: "🛡️", title: "Amanah", desc: "Dikelola secara profesional sesuai syariat dan regulasi pemerintah." },
                  { icon: "⚡", title: "Cepat", desc: "Layanan responsif dan penyaluran bantuan yang tepat waktu." },
                  { icon: "📊", title: "Transparan", desc: "Laporan keuangan transparan dan diaudit secara berkala." }
              ].map((f, i) => (
                  <motion.div 
                    whileHover={{ y: -5 }}
                    key={i} 
                    className="p-8 rounded-3xl border border-gray-100 bg-gray-50/50 text-center"
                  >
                      <div className="text-5xl mb-6">{f.icon}</div>
                      <h4 className="text-xl font-bold mb-3 text-gray-900">{f.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{f.desc}</p>
                  </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
               <span className="text-primary font-bold uppercase tracking-widest text-xs">Program Unggulan</span>
               <h2 className="text-3xl lg:text-4xl font-bold mt-3 text-gray-900">Mari Berkontribusi Melalui Program Kebaikan</h2>
            </div>
            <Link to="/program" className="btn-outline-success rounded-full px-6 py-2.5 hidden md:flex items-center gap-2">
               Lihat Semua <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {featuredPrograms.map(item => (
                <ProgramCard key={item.id} {...item} />
             ))}
          </div>
          
          <div className="text-center mt-12 md:hidden">
            <Link to="/program" className="btn-outline-success w-full py-4 rounded-xl">
               Lihat Semua Program
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-gray-900">
         <div className="absolute inset-0 opacity-10" style={{ 
             backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', 
             backgroundSize: '30px 30px' 
         }}></div>
         
         <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
               <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Sudahkah Anda Menghitung Zakat?</h2>
               <p className="text-lg text-gray-400 mb-10 leading-relaxed">
                  Gunakan kalkulator zakat kami untuk menghitung kewajiban zakat Maal, Profesi, atau Penghasilan Anda dengan mudah dan akurat.
               </p>
               <Link to="/kalkulator-zakat" className="bg-primary hover:bg-primary-hover text-white px-10 py-5 rounded-full text-lg font-bold shadow-2xl inline-flex items-center gap-3 transition-all hover:scale-105">
                  <span>🧮</span> Hitung Zakat Sekarang
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Beranda;