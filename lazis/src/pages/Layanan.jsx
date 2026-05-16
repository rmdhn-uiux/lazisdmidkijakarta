import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LaporanChart from '../components/LaporanChart';

const Layanan = ({ subPage }) => {
  const activeTab = subPage || 'kantor';

  const renderContent = () => {
    switch (activeTab) {
      case 'kantor':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
             <div className="flex items-center gap-4 mb-8">
                <div className="bg-primary/10 p-4 rounded-2xl text-primary">
                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                   </svg>
                </div>
                <div>
                   <h2 className="text-2xl font-bold text-gray-900">Kantor Layanan</h2>
                   <p className="text-text-muted">Kunjungi kantor kami untuk layanan langsung</p>
                </div>
             </div>
             
             <div className="bg-white border border-gray-100 shadow-sm rounded-3xl overflow-hidden">
                <div className="flex flex-col md:flex-row">
                   <div className="md:w-1/2 min-h-[300px]">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.338872656363!2d106.845599314769!3d-6.219036995498068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f46408287e07%3A0x68551918451846b0!2sMasjid%20Raya%20DMI%20Provinsi%20DKI%20Jakarta!5e0!3m2!1sid!2sid!4v1679000000000!5m2!1sid!2sid" 
                        className="w-full h-full border-0"
                        allowFullScreen="" 
                        loading="lazy"
                        title="Lokasi Kantor"
                      ></iframe>
                   </div>
                   <div className="md:w-1/2 p-8 flex flex-column justify-center">
                      <div className="mb-6">
                        <h5 className="font-bold text-lg mb-3 text-gray-900">Kantor Pusat</h5>
                        <p className="text-text-muted leading-relaxed">
                          Jl. Masjid Raya No. 1, RT.01/RW.01, Jati Pulo, Kec. Palmerah, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11430
                        </p>
                      </div>
                      
                      <div className="pt-6 border-t border-gray-100">
                        <h6 className="font-bold mb-4 text-gray-900">Jam Operasional</h6>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50">
                            <span className="text-text-muted">Senin - Jumat:</span>
                            <span className="font-semibold text-primary">08.00 - 16.00 WIB</span>
                          </div>
                          <div className="flex justify-between items-center p-2 rounded-lg">
                            <span className="text-text-muted">Sabtu - Minggu:</span>
                            <span className="font-semibold text-red-500">Tutup</span>
                          </div>
                        </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        );
      case 'konsultasi':
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-12 px-6"
          >
             <div className="bg-primary/10 p-8 rounded-full text-primary inline-flex mb-8">
                 <span className="text-5xl">💬</span>
             </div>
             <h2 className="text-3xl font-bold mb-4 text-gray-900">Konsultasi ZISWAF</h2>
             <p className="text-text-muted mb-10 max-w-xl mx-auto text-lg">
                Bingung menghitung zakat? Ingin berkonsultasi seputar hukum waris atau wakaf? 
                Tim asatidz kami siap membantu Anda.
             </p>
             <a
               href="https://wa.me/6283899342854"
               target="_blank"
               rel="noreferrer"
               className="btn-primary rounded-full px-10 py-4 text-lg shadow-xl hover:scale-105 active:scale-95"
             >
               Chat via WhatsApp
             </a>          </motion.div>
        );
      case 'rekening':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
             <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Rekening Donasi</h2>
                <p className="text-text-muted text-lg">Salurkan donasi terbaik Anda melalui rekening resmi kami</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                   { bank: 'BSI', no: '700.1234.5678', name: 'Lazis DMI DKI Jakarta', color: 'text-[#00a39d]' },
                   { bank: 'Bank Mandiri', no: '123.00.0456789.0', name: 'Lazis DMI DKI Jakarta', color: 'text-[#003d79]' },
                   { bank: 'BCA', no: '001.234.5678', name: 'Lazis DMI DKI Jakarta', color: 'text-[#005ca9]' }
                ].map((rek, i) => (
                   <motion.div 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 text-center group transition-all"
                   >
                         <h5 className={`font-bold text-xl mb-4 ${rek.color}`}>{rek.bank}</h5>
                         <div className="my-6 py-4 bg-gray-50 rounded-2xl group-hover:bg-primary/5 transition-colors">
                            <h4 className="text-xl font-bold text-gray-900 tracking-wider">{rek.no}</h4>
                         </div>
                         <p className="text-sm text-text-muted mb-6">a.n {rek.name}</p>
                         <button 
                            className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                            onClick={() => {
                              navigator.clipboard.writeText(rek.no);
                              alert('Nomor rekening berhasil disalin!');
                            }}
                         >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                            Salin No. Rekening
                         </button>
                   </motion.div>
                ))}
             </div>
          </motion.div>
        );
      case 'laporan':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
                <div>
                   <h2 className="text-3xl font-bold text-gray-900">Laporan Tahunan</h2>
                   <p className="text-text-muted mt-2">Transparansi penyaluran dana zakat, infaq, dan sedekah</p>
                </div>
                <div className="relative inline-block text-left">
                   <select className="appearance-none bg-white border border-gray-200 rounded-full px-6 py-3 pr-12 font-bold text-gray-700 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer">
                      <option>Tahun 2025</option>
                      <option>Tahun 2024</option>
                   </select>
                   <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                   </div>
                </div>
             </div>
             
             <LaporanChart />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-20 bg-bg">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           <div className="lg:col-span-1">
              <div className="bg-white border border-gray-100 shadow-sm rounded-3xl overflow-hidden sticky top-28">
                 <div className="flex flex-col">
                    {[
                       { id: 'kantor', label: 'Kantor Layanan', icon: '🏢' },
                       { id: 'konsultasi', label: 'Konsultasi', icon: '💬' },
                       { id: 'rekening', label: 'Info Rekening', icon: '💳' },
                       { id: 'laporan', label: 'Laporan', icon: '📊' }
                    ].map(item => (
                       <Link 
                          key={item.id} 
                          to={`/${item.id === 'laporan' ? 'annual-report' : item.id === 'rekening' ? 'info-rekening' : item.id === 'kantor' ? 'kantor-layanan' : item.id}`}
                          className={`flex items-center gap-3 p-4 border-l-4 transition-all ${activeTab === item.id ? 'bg-primary/5 border-primary text-primary font-bold' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
                       >
                          <span className="text-xl">{item.icon}</span> 
                          <span className="text-sm uppercase tracking-wider">{item.label}</span>
                       </Link>
                    ))}
                 </div>
              </div>
           </div>
           
           <div className="lg:col-span-3 min-h-[500px]">
              <AnimatePresence mode="wait">
                {renderContent()}
              </AnimatePresence>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Layanan;
