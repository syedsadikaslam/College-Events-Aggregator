import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { LogIn } from 'lucide-react'; 

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext); 
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState(null);

    const { email, password } = formData;

    // OAuth Redirect ke baad URL se token nikalne ke liye
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        if (token) {
            localStorage.setItem('token', token);
            // Token milte hi refresh ya redirect karein taaki AuthContext update ho jaye
            window.location.href = '/';
        }
    }, [location]);

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const res = await login(email, password);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.message);
        }
    };

    const handleSocialLogin = (provider) => {
        window.location.href = `http://localhost:5173/api/auth/${provider}`;
    };

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
                <div className="flex justify-center mb-6">
                    <div className="p-3 bg-blue-100 rounded-full">
                        <LogIn size={32} className="text-blue-600" />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Welcome Back</h2>

                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-center text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-blue-200"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        {/* Google Button - Only one, full width */}
                        <button
                            onClick={() => handleSocialLogin('google')}
                            className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <img 
                                src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" 
                                alt="Google Logo" 
                                className="h-5 w-5 mr-3" 
                            />
                            <span className="font-medium">Google</span>
                        </button>
                    </div>
                </div>

                <p className="mt-8 text-center text-gray-600 text-sm">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-600 font-semibold hover:text-blue-700">
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
