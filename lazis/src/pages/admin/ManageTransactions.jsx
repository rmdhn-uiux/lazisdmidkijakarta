import { useState, useEffect } from 'react';
import { getTransactions, createTransaction, deleteTransaction, updateTransaction } from '../../api';
import { formatRp } from '../../utils/format';
import AdminLayout from '../../components/admin/AdminLayout';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ManageTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({
        type: 'zakat',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        description: ''
    });
    const [refresh, setRefresh] = useState(0);

    const triggerRefresh = () => setRefresh(prev => prev + 1);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await getTransactions();
                setTransactions(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTransactions();
    }, [refresh]);

    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(transactions);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
        XLSX.writeFile(workbook, `Laporan_Transaksi_Lazis_${new Date().toLocaleDateString()}.xlsx`);
    };

    const exportCSV = () => {
        const worksheet = XLSX.utils.json_to_sheet(transactions);
        const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
        const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `Laporan_Transaksi_Lazis_${new Date().toLocaleDateString()}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportPDF = () => {
        const doc = jsPDF();
        
        // Header
        doc.setFontSize(22);
        doc.setTextColor(16, 185, 129); // Primary color
        doc.text("LAZIS DMI DKI JAKARTA", 105, 20, { align: "center" });
        
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("Masjid Raya DMI Provinsi DKI Jakarta", 105, 27, { align: "center" });
        doc.text("Jl. Masjid Raya No. 1, Jati Pulo, Jakarta Barat", 105, 32, { align: "center" });
        doc.text("Email: info@lazisdmidki.or.id | WhatsApp: 083899342854", 105, 37, { align: "center" });
        
        doc.setLineWidth(0.5);
        doc.setDrawColor(16, 185, 129);
        doc.line(20, 42, 190, 42);

        doc.setFontSize(16);
        doc.setTextColor(0);
        doc.text("LAPORAN TRANSAKSI", 105, 55, { align: "center" });

        const tableColumn = ["Tanggal", "Tipe", "Keterangan", "Nominal"];
        const tableRows = transactions.map(t => [
            t.date,
            t.type.toUpperCase(),
            t.description,
            formatRp(t.amount)
        ]);

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 65,
            theme: 'grid',
            headStyles: { fillStyle: 'F', fillColor: [16, 185, 129], textColor: [255, 255, 255], fontStyle: 'bold' },
            styles: { fontSize: 9, cellPadding: 3 },
            alternateRowStyles: { fillColor: [245, 245, 245] }
        });

        doc.save(`Laporan_Transaksi_Lazis_${new Date().toLocaleDateString()}.pdf`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Yakin ingin menghapus data ini?')) {
            try {
                await deleteTransaction(id);
                triggerRefresh();
            } catch (error) {
                console.error(error);
                alert('Gagal menghapus data');
            }
        }
    };

    const handleEdit = (t) => {
        setEditingId(t.id);
        setForm({
            type: t.type,
            amount: t.amount,
            date: t.date,
            description: t.description
        });
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleOpenCreate = () => {
        setIsEditMode(false);
        setEditingId(null);
        setForm({
            type: 'zakat',
            amount: '',
            date: new Date().toISOString().split('T')[0],
            description: ''
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                ...form,
                amount: Number(form.amount)
            };
            if (isEditMode) {
                await updateTransaction(editingId, data);
            } else {
                await createTransaction(data);
            }
            setIsModalOpen(false);
            triggerRefresh();
        } catch (error) {
            console.error(error);
            alert(isEditMode ? 'Gagal mengubah data' : 'Gagal menambah data');
        }
    };

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Manajemen Transaksi</h2>
                    <p className="text-sm text-gray-500 font-medium">Kelola dan ekspor laporan transaksi Lazis.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <div className="bg-gray-100 p-1.5 rounded-2xl flex gap-1">
                        <button onClick={exportPDF} className="bg-white hover:bg-gray-50 text-red-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition-all flex items-center gap-2">
                           <span>PDF</span>
                        </button>
                        <button onClick={exportExcel} className="bg-white hover:bg-gray-50 text-emerald-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition-all flex items-center gap-2">
                           <span>Excel</span>
                        </button>
                        <button onClick={exportCSV} className="bg-white hover:bg-gray-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition-all flex items-center gap-2">
                           <span>CSV</span>
                        </button>
                    </div>
                    <button 
                        onClick={handleOpenCreate}
                        className="bg-primary hover:bg-primary-hover text-white rounded-2xl px-6 py-4 font-bold shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center gap-2"
                    >
                        <span className="text-xl">+</span> Tambah
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-5 font-black text-xs text-gray-400 uppercase tracking-widest">Tanggal</th>
                                <th className="px-8 py-5 font-black text-xs text-gray-400 uppercase tracking-widest">Tipe</th>
                                <th className="px-8 py-5 font-black text-xs text-gray-400 uppercase tracking-widest">Keterangan</th>
                                <th className="px-8 py-5 font-black text-xs text-gray-400 uppercase tracking-widest text-right">Nominal</th>
                                <th className="px-8 py-5 font-black text-xs text-gray-400 uppercase tracking-widest text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {transactions.map(t => (
                                <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-5 text-sm font-bold text-gray-700">{t.date}</td>
                                    <td className="px-8 py-5">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                            t.type === 'zakat' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                                        }`}>
                                            {t.type}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-sm font-medium text-gray-600">{t.description}</td>
                                    <td className="px-8 py-5 text-sm font-black text-gray-900 text-right">{formatRp(t.amount)}</td>
                                    <td className="px-8 py-5 text-center flex justify-center gap-2">
                                        <button 
                                            onClick={() => handleEdit(t)} 
                                            className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
                                            title="Ubah"
                                        >
                                            ✏️
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(t.id)} 
                                            className="w-9 h-9 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                            title="Hapus"
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {transactions.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center text-gray-400 font-medium">Belum ada data transaksi.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-[3rem] p-10 max-w-md w-full shadow-2xl">
                        <h3 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">
                            {isEditMode ? 'Ubah Catatan' : 'Tambah Catatan Baru'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Tipe Dana</label>
                                <select 
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-bold text-gray-700 transition-all"
                                    value={form.type}
                                    onChange={(e) => setForm({...form, type: e.target.value})}
                                >
                                    <option value="zakat">Zakat</option>
                                    <option value="infaq">Infaq</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Nominal (Rp)</label>
                                <input 
                                    type="number" 
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-bold text-gray-700 transition-all"
                                    placeholder="Masukkan angka..."
                                    value={form.amount}
                                    onChange={(e) => setForm({...form, amount: e.target.value})}
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
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Keterangan</label>
                                <textarea 
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-gray-700 transition-all resize-none"
                                    rows="3"
                                    placeholder="Contoh: Zakat Mal Bapak Ahmad"
                                    value={form.description}
                                    onChange={(e) => setForm({...form, description: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button 
                                    type="button" 
                                    onClick={() => setIsModalOpen(false)} 
                                    className="flex-1 py-4 text-gray-400 font-bold hover:text-gray-600 transition-colors"
                                >
                                    Batal
                                </button>
                                <button className="flex-[2] bg-primary text-white py-4 rounded-2xl font-black shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all active:scale-95">
                                    {isEditMode ? 'Simpan Perubahan' : 'Simpan Data'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default ManageTransactions;
