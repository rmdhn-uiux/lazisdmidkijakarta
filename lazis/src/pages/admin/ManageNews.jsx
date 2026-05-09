import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getNews, deleteNews, createNews } from '../../api';

const ManageNews = () => {
    const [news, setNews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newNews, setNewNews] = useState({ title: '', content: '', date: new Date().toISOString().split('T')[0] });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) navigate('/login');
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const res = await getNews();
            setNews(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Yakin ingin menghapus berita ini?')) {
            await deleteNews(id);
            fetchNews();
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await createNews(newNews);
            setIsModalOpen(false);
            setNewNews({ title: '', content: '', date: new Date().toISOString().split('T')[0] });
            fetchNews();
        } catch (err) {
            alert('Gagal menambah berita');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
                <h1 className="text-2xl font-bold text-primary mb-10">Admin Lazis</h1>
                <nav className="flex-1 space-y-2">
                    <Link to="/admin" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition">Programs</Link>
                    <Link to="/admin/news" className="block px-4 py-2 rounded-lg bg-primary/10 text-primary font-bold">Berita</Link>
                </nav>
                <button onClick={logout} className="mt-auto text-red-600 font-bold text-left px-4">Logout</button>
            </div>

            {/* Content */}
            <div className="flex-1 p-10">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-bold">Kelola Berita</h2>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="btn-primary rounded-xl px-6 py-2"
                    >
                        + Tambah Berita
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {news.map(n => (
                        <div key={n.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold">{n.title}</h3>
                                <button onClick={() => handleDelete(n.id)} className="text-red-500 hover:underline">Hapus</button>
                            </div>
                            <p className="text-gray-500 text-sm mb-2">{n.date}</p>
                            <p className="text-gray-600 line-clamp-3">{n.content}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-2xl w-full">
                        <h3 className="text-2xl font-bold mb-6">Tambah Berita Baru</h3>
                        <form onSubmit={handleCreate}>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Judul</label>
                                <input 
                                    type="text" 
                                    className="w-full px-4 py-2 border rounded-xl"
                                    value={newNews.title}
                                    onChange={(e) => setNewNews({...newNews, title: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Konten</label>
                                <textarea 
                                    className="w-full px-4 py-2 border rounded-xl h-40"
                                    value={newNews.content}
                                    onChange={(e) => setNewNews({...newNews, content: e.target.value})}
                                    required
                                ></textarea>
                            </div>
                            <div className="flex justify-end gap-3 mt-8">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-gray-500">Batal</button>
                                <button className="bg-primary text-white px-6 py-2 rounded-xl">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageNews;
