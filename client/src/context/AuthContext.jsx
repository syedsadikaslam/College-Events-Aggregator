import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    // 1. User Profile fetch karne ki function
    const loadUser = async (currentToken) => {
        if (!currentToken) return setLoading(false);
        
        try {
            const res = await axios.get('https://internxbysadik.vercel.app/api/users/me', {
                headers: { Authorization: `Bearer ${currentToken}` }
            });
            setUser(res.data.data); // Backend se user data set karein
            localStorage.setItem('user', JSON.stringify(res.data.data));
        } catch (error) {
            console.error("LoadUser Error:", error);
            logout(); // Agar token invalid hai toh logout kar dein
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            // Agar local storage mein user hai toh pehle woh dikhayein
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
                setUser(storedUser);
                setLoading(false);
            } else {
                // Varna backend se fetch karein (Google login ke baad yahi help karega)
                loadUser(token);
            }
        } else {
            setLoading(false);
        }
    }, [token]);

    const login = async (email, password) => {
        try {
            const res = await axios.post('https://internxbysadik.vercel.app/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data));
            setToken(res.data.token);
            setUser(res.data);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Login failed' };
        }
    };

    const signup = async (name, email, password) => {
        try {
            const res = await axios.post('https://internxbysadik.vercel.app/api/auth/signup', { name, email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data));
            setToken(res.data.token);
            setUser(res.data);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Signup failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        window.location.href = '/login';
    };

    const updateUser = (updatedUserData) => {
        setUser(updatedUserData);
        localStorage.setItem('user', JSON.stringify(updatedUserData));
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, signup, logout, updateUser, loadUser }}>
            {children}
        </AuthContext.Provider>
    );
};
