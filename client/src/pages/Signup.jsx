import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
    const { signup } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const { name, email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const res = await signup(name, email, password);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.message);
        }
    };

    const handleSocialLogin = (provider) => {
        window.location.href = `http://localhost:5000/api/auth/${provider}`;
    };

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] bg-gray-100 py-12">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
                <div className="flex justify-center mb-6">
                    <div className="p-3 bg-green-100 rounded-full">
                        <UserPlus size={32} className="text-green-600" />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Create Account</h2>

                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-center text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={onChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                            placeholder="john@example.com"
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
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                            placeholder="Create a password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-green-200"
                    >
                        Sign Up
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
                        <button
                            onClick={() => handleSocialLogin('google')}
                            className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            {/* Official Google Color Logo */}
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
                    Already have an account?{' '}
                    <Link to="/login" className="text-green-600 font-semibold hover:text-green-700">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;