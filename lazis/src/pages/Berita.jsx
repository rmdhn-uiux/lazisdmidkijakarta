import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getNews } from '../api';

const Berita = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await getNews();
                setNews(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <section className="py-32 bg-bg min-h-screen">
            <div className="container">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold uppercase tracking-widest text-xs mb-3 block">Informasi Terkini</span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Berita & Kegiatan</h2>
                    <p className="text-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
                        Ikuti perkembangan program dan kegiatan Lazis DMI DKI Jakarta dalam menebar kebaikan.
                    </p>
                </div>

                {news.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {news.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all"
                            >
                                <div className="h-56 bg-gray-100 overflow-hidden">
                                    <img 
                                        src={item.image_url || `https://placehold.co/600x400/15803d/ffffff?text=Berita`} 
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-8">
                                    <p className="text-primary font-bold text-xs uppercase mb-3">{item.date}</p>
                                    <h3 className="text-xl font-bold mb-4 line-clamp-2">{item.title}</h3>
                                    <p className="text-gray-600 line-clamp-3 mb-6 text-sm leading-relaxed">{item.content}</p>
                                    <button className="text-primary font-bold text-sm hover:underline">Baca Selengkapnya →</button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-300">
                        <div className="text-6xl mb-4">📰</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Belum Ada Berita</h3>
                        <p className="text-text-muted">Nantikan informasi menarik dari kami segera.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Berita;
