import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // URL se token nikalne ke liye (e.g., ?token=xyz...)
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            // 1. Token ko localStorage mein save karein
            localStorage.setItem('token', token);
            
            // 2. Profile page par bhej dein aur page reload karein taaki 
            // AuthContext naya token detect kar sake
            window.location.href = '/profile';
        } else {
            // Agar token nahi mila toh login par wapas bhej dein
            navigate('/login');
        }
    }, [location, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600 font-medium">Verifying login, please wait...</p>
        </div>
    );
};

export default AuthSuccess;