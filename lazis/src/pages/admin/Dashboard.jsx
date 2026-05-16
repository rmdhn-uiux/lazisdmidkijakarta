import { useState, useEffect } from 'react';
import { getTransactions, getPrograms, getNews } from '../../api';
import { formatRp } from '../../utils/format';
import AdminLayout from '../../components/admin/AdminLayout';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalZakat: 0,
        totalInfaq: 0,
        programCount: 0,
        newsCount: 0,
        monthlyData: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [transRes, progRes, newsRes] = await Promise.all([
                    getTransactions(),
                    getPrograms(),
                    getNews()
                ]);

                const transactions = transRes.data;
                const totalZakat = transactions.filter(t => t.type === 'zakat').reduce((sum, t) => sum + t.amount, 0);
                const totalInfaq = transactions.filter(t => t.type === 'infaq').reduce((sum, t) => sum + t.amount, 0);

                // Simple monthly grouping for chart (last 6 months)
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                const monthlyData = months.map((month, index) => {
                    const zakat = transactions
                        .filter(t => t.type === 'zakat' && t.date.includes(`-0${index + 1}-`))
                        .reduce((sum, t) => sum + t.amount, 0);
                    const infaq = transactions
                        .filter(t => t.type === 'infaq' && t.date.includes(`-0${index + 1}-`))
                        .reduce((sum, t) => sum + t.amount, 0);
                    return { month, zakat, infaq };
                });

                setStats({
                    totalZakat,
                    totalInfaq,
                    programCount: progRes.data.length,
                    newsCount: newsRes.data.length,
                    monthlyData
                });
            } catch (err) {
                console.error('Error fetching dashboard stats', err);
            }
        };

        fetchData();
    }, []);

    const maxAmount = Math.max(...stats.monthlyData.flatMap(d => [d.zakat, d.infaq]), 1000000);

    return (
        <AdminLayout>
            <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Total Zakat', val: formatRp(stats.totalZakat), icon: '💰', color: 'bg-emerald-500' },
                        { label: 'Total Infaq', val: formatRp(stats.totalInfaq), icon: '🤲', color: 'bg-blue-500' },
                        { label: 'Aktif Program', val: stats.programCount, icon: '📋', color: 'bg-amber-500' },
                        { label: 'Berita/Artikel', val: stats.newsCount, icon: '📰', color: 'bg-purple-500' },
                    ].map((s, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-5">
                            <div className={`${s.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg`}>
                                {s.icon}
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{s.label}</p>
                                <p className="text-xl font-black text-gray-900">{s.val}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Monthly Chart */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-xl font-black text-gray-900">Grafik Penyaluran</h3>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Laporan Zakat & Infaq 2025</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                                    <span className="text-[10px] font-bold text-gray-500">ZAKAT</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    <span className="text-[10px] font-bold text-gray-500">INFAQ</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-64 flex items-end justify-between gap-4 px-4">
                            {stats.monthlyData.map((d, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-3">
                                    <div className="w-full flex justify-center gap-1.5 h-48 items-end">
                                        <motion.div 
                                            initial={{ height: 0 }}
                                            animate={{ height: `${(d.zakat / maxAmount) * 100}%` }}
                                            className="w-4 bg-emerald-500 rounded-t-lg shadow-lg shadow-emerald-500/20"
                                            title={formatRp(d.zakat)}
                                        ></motion.div>
                                        <motion.div 
                                            initial={{ height: 0 }}
                                            animate={{ height: `${(d.infaq / maxAmount) * 100}%` }}
                                            className="w-4 bg-blue-500 rounded-t-lg shadow-lg shadow-blue-500/20"
                                            title={formatRp(d.infaq)}
                                        ></motion.div>
                                    </div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase">{d.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Distribution Info */}
                    <div className="bg-primary rounded-[2.5rem] p-8 text-white shadow-xl shadow-primary/20 flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold mb-2">Ringkasan Dana</h3>
                            <p className="text-white/60 text-sm mb-8 font-medium">Dana terhimpun secara keseluruhan melalui input manual admin.</p>
                            
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-widest">
                                        <span>Zakat Mal</span>
                                        <span>75%</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-secondary w-3/4"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-widest">
                                        <span>Infaq Masjid</span>
                                        <span>45%</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-white w-[45%]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 p-5 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-sm">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">Pesan Sistem</p>
                            <p className="text-xs font-medium italic">&quot;Pastikan setiap dana yang masuk dicatat dengan teliti untuk menjaga amanat umat.&quot;</p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
