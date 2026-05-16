import { useState, useEffect } from 'react';
import { getNews, createNews, deleteNews, updateNews } from '../../api';
import AdminLayout from '../../components/admin/AdminLayout';

const ManageNews = () => {
    const [news, setNews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ title: '', content: '', date: new Date().toISOString().split('T')[0] });
    const [refresh, setRefresh] = useState(0);

    const triggerRefresh = () => setRefresh(prev => prev + 1);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await getNews();
                setNews(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchNews();
    }, [refresh]);

    const handleDelete = async (id) => {
        if (window.confirm('Yakin ingin menghapus berita ini?')) {
            await deleteNews(id);
            triggerRefresh();
        }
    };

    const handleEdit = (n) => {
        setEditingId(n.id);
        setForm({ title: n.title, content: n.content, date: n.date });
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleOpenCreate = () => {
        setIsEditMode(false);
        setEditingId(null);
        setForm({ title: '', content: '', date: new Date().toISOString().split('T')[0] });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await updateNews(editingId, form);
            } else {
                await createNews(form);
            }
            setIsModalOpen(false);
            triggerRefresh();
        } catch (error) {
            console.error(error);
            alert(isEditMode ? 'Gagal mengubah berita' : 'Gagal menambah berita');
        }
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Kelola Berita</h2>
                    <p className="text-sm text-gray-500 font-medium">Publikasikan informasi dan artikel terbaru.</p>
                </div>
                <button 
                    onClick={handleOpenCreate}
                    className="bg-primary hover:bg-primary-hover text-white rounded-2xl px-8 py-4 font-bold shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center gap-2"
                >
                    <span className="text-xl">+</span> Tulis Berita
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news.map(n => (
                    <div key={n.id} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[10px] font-black text-primary bg-primary/5 px-3 py-1.5 rounded-full uppercase tracking-widest border border-primary/10">
                                    {n.date}
                                </span>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => handleEdit(n)}
                                        className="text-blue-500 hover:text-blue-700 transition-colors text-sm font-bold"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(n.id)}
                                        className="text-red-400 hover:text-red-600 transition-colors text-sm font-bold"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{n.title}</h3>
                            <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-6">{n.content}</p>
                        </div>
                        <div className="pt-6 border-t border-gray-50">
                            <button onClick={() => handleEdit(n)} className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
                                Kelola Detail →
                            </button>
                        </div>
                    </div>
                ))}
                {news.length === 0 && (
                    <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border border-gray-100">
                        <p className="text-gray-400 font-medium">Belum ada berita yang diterbitkan.</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-[3rem] p-10 max-w-2xl w-full shadow-2xl overflow-y-auto max-h-[90vh]">
                        <h3 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">
                            {isEditMode ? 'Ubah Berita' : 'Tulis Berita Baru'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Judul Berita</label>
                                <input 
                                    type="text" 
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-bold text-gray-700 transition-all"
                                    value={form.title}
                                    onChange={(e) => setForm({...form, title: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Tanggal</label>
                                <input 
                                    type="date" 
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-bold text-gray-700 transition-all"
                                    value={form.date}
                                    onChange={(e) => setForm({...form, date: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Isi Berita</label>
                                <textarea 
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-gray-700 transition-all resize-none"
                                    rows="8"
                                    value={form.content}
                                    onChange={(e) => setForm({...form, content: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 text-gray-400 font-bold hover:text-gray-600 transition-colors">Batal</button>
                                <button className="flex-[2] bg-primary text-white py-4 rounded-2xl font-black shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all active:scale-95">
                                    {isEditMode ? 'Simpan Perubahan' : 'Terbitkan Berita'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default ManageNews;
