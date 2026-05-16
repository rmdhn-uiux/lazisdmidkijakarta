import { Link } from 'react-router-dom';
import { formatRp } from '../utils/format';
import { motion } from 'framer-motion';

const ProgramCard = ({ title, category, target, collected = 0, image }) => {
  const displayCategory = category || 'Umum';
  const percentage = Math.min(100, Math.round((collected / target) * 100));
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col h-full"
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={image || `https://placehold.co/600x400/15803d/ffffff?text=${encodeURIComponent(displayCategory)}`} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
          alt={title} 
        />
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-sm text-primary text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider">
            {displayCategory}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2 leading-snug h-12">
          {title}
        </h3>
        
        <div className="mt-auto">
          <div className="flex justify-between text-xs font-bold mb-2">
            <span className="text-primary">{formatRp(collected)}</span>
            <span className="text-gray-400">Target: {formatRp(target)}</span>
          </div>
          
          <div className="w-full h-2 bg-gray-100 rounded-full mb-4 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-primary rounded-full"
            ></motion.div>
          </div>
          
          <div className="flex justify-between items-center mb-6 text-[11px] font-medium text-gray-500">
             <span className="flex items-center gap-1">
                <span className="text-primary font-bold">{percentage}%</span> Terkumpul
             </span>
             <span>∞ Hari Lagi</span>
          </div>

<Link 
             to="/program" 
             className="w-full py-3 rounded-xl border-2 border-primary text-primary font-bold text-sm text-center hover:bg-primary hover:text-white transition-all block"
           >
             Donasi Sekarang
           </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgramCard;