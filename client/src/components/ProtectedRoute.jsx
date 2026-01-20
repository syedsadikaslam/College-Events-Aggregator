import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ adminOnly = false }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="flex justify-center p-10">Loading...</div>; // Or a spinner
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
