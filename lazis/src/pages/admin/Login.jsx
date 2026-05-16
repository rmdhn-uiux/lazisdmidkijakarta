import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api';
import logoLazis from '../../assets/logolazisdmi.jpg';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ username, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', response.data.username);
            navigate('/admin/dashboard');
        } catch (error) {
            console.error(error);
            setError('Login gagal. Periksa username dan password.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-10 lg:p-14 rounded-[3rem] shadow-2xl w-full max-w-lg border border-gray-100">
                <div className="text-center mb-10">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                        <img src={logoLazis} alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Lazis Admin Panel</h1>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-2">DMI PROVINSI DKI JAKARTA</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-2xl mb-8 text-sm font-bold flex items-center gap-3 border border-red-100">
                        <span>⚠️</span> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Username</label>
                        <input 
                            type="text" 
                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-gray-700"
                            placeholder="Masukkan username..."
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
                        <input 
                            type="password" 
                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-gray-700"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="w-full bg-primary hover:bg-primary-hover text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-primary/20 active:scale-[0.98] text-lg">
                        Masuk Sekarang
                    </button>
                    
                    <div className="text-center pt-4">
                        <button 
                            type="button"
                            onClick={() => navigate('/')}
                            className="text-sm font-bold text-gray-400 hover:text-primary transition-colors"
                        >
                            ← Kembali ke Beranda
                        </button>
                    </div>
                </form>
                
                <p className="text-center mt-10 text-xs text-gray-400 font-medium">
                    &copy; {new Date().getFullYear()} Lazis DMI DKI Jakarta
                </p>
            </div>
        </div>
    );
};

export default Login;
