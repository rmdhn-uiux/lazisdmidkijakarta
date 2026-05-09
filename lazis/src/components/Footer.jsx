import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10 mt-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Tentang Kami */}
          <div className="space-y-6">
            <h5 className="text-xl font-bold text-primary">Lazis DMI DKI Jakarta</h5>
            <p className="text-gray-400 text-sm leading-relaxed">
              Lembaga Amil Zakat yang dikelola oleh Dewan Masjid Indonesia Provinsi DKI Jakarta. 
              Menebar kebaikan dan memberdayakan umat melalui dana ZISWAF yang dikelola secara amanah dan profesional.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">FB</a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">IG</a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">YT</a>
            </div>
          </div>

          {/* Program */}
          <div>
            <h6 className="text-lg font-bold mb-6">Program Kami</h6>
            <ul className="space-y-4 text-sm">
              <li><Link to="/program/pendidikan" className="text-gray-400 hover:text-white transition-colors">🎓 Pendidikan</Link></li>
              <li><Link to="/program/kesehatan" className="text-gray-400 hover:text-white transition-colors">🏥 Kesehatan</Link></li>
              <li><Link to="/program/ekonomi" className="text-gray-400 hover:text-white transition-colors">💼 Ekonomi Umat</Link></li>
              <li><Link to="/program/kemanusiaan" className="text-gray-400 hover:text-white transition-colors">🤝 Kemanusiaan</Link></li>
            </ul>
          </div>

          {/* Tautan Cepat */}
          <div>
            <h6 className="text-lg font-bold mb-6">Tautan Cepat</h6>
            <ul className="space-y-4 text-sm">
              <li><Link to="/tentang-kami" className="text-gray-400 hover:text-white transition-colors">Tentang Kami</Link></li>
              <li><Link to="/kalkulator-zakat" className="text-gray-400 hover:text-white transition-colors">Kalkulator Zakat</Link></li>
              <li><Link to="/info-rekening" className="text-gray-400 hover:text-white transition-colors">Info Rekening</Link></li>
              <li><Link to="/berita" className="text-gray-400 hover:text-white transition-colors">Berita Terkini</Link></li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h6 className="text-lg font-bold mb-6">Hubungi Kami</h6>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex gap-3">
                <span>📍</span>
                <span>Jl. Masjid Raya No. 1, Jakarta</span>
              </li>
              <li className="flex gap-3">
                <span>📞</span>
                <span>(021) 1234-5678</span>
              </li>
              <li className="flex gap-3 text-primary font-bold">
                <span>📱</span>
                <span>+62 821-1746-0200 (WA)</span>
              </li>
              <li className="flex gap-3">
                <span>✉️</span>
                <span>info@lazisdmidki.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Lazis DMI DKI Jakarta. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-white">Kebijakan Privasi</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;