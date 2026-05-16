import { useState, useEffect } from 'react';
import { getPrograms, deleteProgram, createProgram, updateProgram } from '../../api';
import { formatRp } from '../../utils/format';
import AdminLayout from '../../components/admin/AdminLayout';

const ManagePrograms = () => {
    const [programs, setPrograms] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ title: '', category: 'pendidikan', target: '', collected: 0 });
    const [refresh, setRefresh] = useState(0);

    const triggerRefresh = () => setRefresh(prev => prev + 1);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const res = await getPrograms();
                setPrograms(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPrograms();
    }, [refresh]);

    const handleDelete = async (id) => {
        if (window.confirm('Yakin ingin menghapus program ini?')) {
            await deleteProgram(id);
            triggerRefresh();
        }
    };

    const handleEdit = (p) => {
        setEditingId(p.id);
        setForm({
            title: p.title,
            category: p.category,
            target: p.target,
            collected: p.collected
        });
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleOpenCreate = () => {
        setIsEditMode(false);
        setEditingId(null);
        setForm({ title: '', category: 'pendidikan', target: '', collected: 0 });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                ...form,
                target: Number(form.target),
                collected: Number(form.collected)
            };
            if (isEditMode) {
                await updateProgram(editingId, data);
            } else {
                await createProgram(data);
            }
            setIsModalOpen(false);
            triggerRefresh();
        } catch (error) {
            console.error(error);
            alert(isEditMode ? 'Gagal mengubah program' : 'Gagal menambah program');
        }
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Kelola Program</h2>
                    <p className="text-sm text-gray-500 font-medium">Atur program pendayagunaan dan pemberdayaan umat.</p>
                </div>
                <button 
                    onClick={handleOpenCreate}
                    className="bg-primary hover:bg-primary-hover text-white rounded-2xl px-8 py-4 font-bold shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center gap-2"
                >
                    <span className="text-xl">+</span> Tambah Program
                </button>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-5 font-black text-xs text-gray-400 uppercase tracking-widest">Judul Program</th>
                                <th className="px-8 py-5 font-black text-xs text-gray-400 uppercase tracking-widest text-center">Kategori</th>
                                <th className="px-8 py-5 font-black text-xs text-gray-400 uppercase tracking-widest text-right">Target</th>
                                <th className="px-8 py-5 font-black text-xs text-gray-400 uppercase tracking-widest text-right">Terkumpul</th>
                                <th className="px-8 py-5 font-black text-xs text-gray-400 uppercase tracking-widest text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {programs.map(p => (
                                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-5 text-sm font-bold text-gray-900">{p.title}</td>
                                    <td className="px-8 py-5 text-center">
                                        <span className="px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-wider border border-primary/10">
                                            {p.category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-sm font-bold text-gray-600 text-right">{formatRp(p.target)}</td>
                                    <td className="px-8 py-5 text-sm font-black text-primary text-right">{formatRp(p.collected)}</td>
                                    <td className="px-8 py-5 text-center flex justify-center gap-2">
                                        <button 
                                            onClick={() => handleEdit(p)} 
                                            className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
                                            title="Ubah"
                                        >
                                            ✏️
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(p.id)} 
                                            className="w-9 h-9 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                            title="Hapus"
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-[3rem] p-10 max-w-md w-full shadow-2xl overflow-y-auto max-h-[90vh]">
                        <h3 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">
                            {isEditMode ? 'Ubah Program' : 'Tambah Program Baru'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Judul Program</label>
                                <input 
                                    type="text" 
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-bold text-gray-700 transition-all"
                                    value={form.title}
                                    onChange={(e) => setForm({...form, title: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Kategori</label>
                                <select 
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-bold text-gray-700 transition-all"
                                    value={form.category}
                                    onChange={(e) => setForm({...form, category: e.target.value})}
                                >
                                    <option value="pendidikan">Pendidikan</option>
                                    <option value="kesehatan">Kesehatan</option>
                                    <option value="ekonomi">Ekonomi</option>
                                    <option value="kemanusiaan">Kemanusiaan</option>
                                    <option value="lingkungan">Lingkungan</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Target (Rp)</label>
                                <input 
                                    type="number" 
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-bold text-gray-700 transition-all"
                                    value={form.target}
                                    onChange={(e) => setForm({...form, target: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Terkumpul (Rp)</label>
                                <input 
                                    type="number" 
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-bold text-gray-700 transition-all"
                                    value={form.collected}
                                    onChange={(e) => setForm({...form, collected: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 text-gray-400 font-bold hover:text-gray-600 transition-colors">Batal</button>
                                <button className="flex-[2] bg-primary text-white py-4 rounded-2xl font-black shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all active:scale-95">
                                    {isEditMode ? 'Simpan Perubahan' : 'Simpan Program'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default ManagePrograms;
