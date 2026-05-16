import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell
} from 'recharts';
import { getTransactions, getPrograms } from '../api';
import { formatRp } from '../utils/format';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const LaporanChart = () => {
  const [transactions, setTransactions] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'zakat', 'infaq', 'program'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transRes, progRes] = await Promise.all([
          getTransactions(),
          getPrograms()
        ]);
        setTransactions(transRes.data);
        setPrograms(progRes.data);
      } catch (error) {
        console.error('Error fetching report data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center py-10">Memuat data laporan...</div>;

  // Process data for charts
  const zakatData = transactions.filter(t => t.type === 'zakat');
  const infaqData = transactions.filter(t => t.type === 'infaq');

  // Monthly data
  const getMonthlyData = (data) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const monthlyMap = {};
    
    data.forEach(t => {
      const date = new Date(t.date);
      const month = months[date.getMonth()];
      monthlyMap[month] = (monthlyMap[month] || 0) + t.amount;
    });

    return months.map(m => ({ name: m, total: monthlyMap[m] || 0 }));
  };

  const monthlyZakat = getMonthlyData(zakatData);
  const monthlyInfaq = getMonthlyData(infaqData);
  
  const combinedMonthly = monthlyZakat.map((item, index) => ({
    name: item.name,
    zakat: item.total,
    infaq: monthlyInfaq[index].total
  }));

  // Program progress data
  const programData = programs.map(p => ({
    name: p.title.substring(0, 20) + '...',
    terkumpul: p.collected,
    target: p.target
  }));

  // Pie chart data for categories
  const categoryData = programs.reduce((acc, p) => {
    const found = acc.find(item => item.name === p.category);
    if (found) {
      found.value += p.collected;
    } else {
      acc.push({ name: p.category, value: p.collected });
    }
    return acc;
  }, []);

  return (
    <div className="space-y-12">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        {['all', 'zakat', 'infaq', 'program'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-2 rounded-full font-bold transition-all ${filter === f ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-12">
        {(filter === 'all' || filter === 'zakat' || filter === 'infaq') && (
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold mb-6 text-gray-900">Statistik Penerimaan Dana Bulanan</h3>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={combinedMonthly}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} tickFormatter={(value) => `Rp ${value/1000000}M`} />
                  <Tooltip 
                    formatter={(value) => formatRp(value)}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  {(filter === 'all' || filter === 'zakat') && <Bar dataKey="zakat" fill="#10b981" radius={[4, 4, 0, 0]} name="Zakat" />}
                  {(filter === 'all' || filter === 'infaq') && <Bar dataKey="infaq" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Infaq/Sedekah" />}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {filter === 'program' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold mb-6 text-gray-900">Distribusi Dana per Kategori</h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatRp(value)} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold mb-6 text-gray-900">Progress Program</h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={programData}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 10}} width={120} />
                    <Tooltip formatter={(value) => formatRp(value)} />
                    <Bar dataKey="terkumpul" fill="#10b981" radius={[0, 4, 4, 0]} name="Terkumpul" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LaporanChart;
