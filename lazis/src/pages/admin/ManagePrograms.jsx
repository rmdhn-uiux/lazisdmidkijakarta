import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getPrograms, deleteProgram, createProgram } from '../../api';
import { formatRp } from '../../utils/format';

const ManagePrograms = () => {
    const [programs, setPrograms] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProgram, setNewProgram] = useState({ title: '', category: 'pendidikan', target: '', collected: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) navigate('/login');
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        try {
            const res = await getPrograms();
            setPrograms(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Yakin ingin menghapus program ini?')) {
            await deleteProgram(id);
            fetchPrograms();
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await createProgram(newProgram);
            setIsModalOpen(false);
            setNewProgram({ title: '', category: 'pendidikan', target: '', collected: 0 });
            fetchPrograms();
        } catch (err) {
            alert('Gagal menambah program');
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
                    <Link to="/admin" className="block px-4 py-2 rounded-lg bg-primary/10 text-primary font-bold">Programs</Link>
                    <Link to="/admin/news" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition">Berita</Link>
                </nav>
                <button onClick={logout} className="mt-auto text-red-600 font-bold text-left px-4">Logout</button>
            </div>

            {/* Content */}
            <div className="flex-1 p-10">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-bold">Kelola Program</h2>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="btn-primary rounded-xl px-6 py-2"
                    >
                        + Tambah Program
                    </button>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-gray-700">Judul</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Kategori</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Target</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Terkumpul</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {programs.map(p => (
                                <tr key={p.id}>
                                    <td className="px-6 py-4">{p.title}</td>
                                    <td className="px-6 py-4 capitalize">{p.category}</td>
                                    <td className="px-6 py-4">{formatRp(p.target)}</td>
                                    <td className="px-6 py-4">{formatRp(p.collected)}</td>
                                    <td className="px-6 py-4 space-x-2">
                                        <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:underline">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full">
                        <h3 className="text-2xl font-bold mb-6">Tambah Program Baru</h3>
                        <form onSubmit={handleCreate}>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Judul</label>
                                <input 
                                    type="text" 
                                    className="w-full px-4 py-2 border rounded-xl"
                                    value={newProgram.title}
                                    onChange={(e) => setNewProgram({...newProgram, title: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Kategori</label>
                                <select 
                                    className="w-full px-4 py-2 border rounded-xl"
                                    value={newProgram.category}
                                    onChange={(e) => setNewProgram({...newProgram, category: e.target.value})}
                                >
                                    <option value="pendidikan">Pendidikan</option>
                                    <option value="kesehatan">Kesehatan</option>
                                    <option value="ekonomi">Ekonomi</option>
                                    <option value="kemanusiaan">Kemanusiaan</option>
                                    <option value="lingkungan">Lingkungan</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Target (Rp)</label>
                                <input 
                                    type="number" 
                                    className="w-full px-4 py-2 border rounded-xl"
                                    value={newProgram.target}
                                    onChange={(e) => setNewProgram({...newProgram, target: e.target.value})}
                                    required
                                />
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

export default ManagePrograms;
