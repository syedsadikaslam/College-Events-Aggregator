import { useEffect, useState, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Briefcase, Calendar, CheckCircle, XCircle, Clock, User, Camera, Upload } from 'lucide-react';

const Profile = () => {
    const { user, token, updateUser } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const res = await axios.get('http://localhost:5000/api/applications/my-applications', config);
                setApplications(res.data.data);
            } catch (err) {
                const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch applications';
                setError(errorMsg);
                console.error('Profile fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        if (user && token) {
            fetchApplications();
        }
    }, [user, token]);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            handleFileUpload(file);
        }
    };

    const handleFileUpload = async (file) => {
        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            };
            const res = await axios.put('http://localhost:5000/api/users/profile-image', formData, config);

            // Update context
            console.log('[DEBUG] Upload success:', res.data);
            const updatedUser = { ...user, ...res.data.data };
            updateUser(updatedUser);
            setPreview(null); // Clear preview as main image updates
        } catch (err) {
            console.error('Profile image upload error:', err);
            const errorMsg = err.response?.data?.message || err.message || 'Failed to upload image';
            setError(errorMsg);
            setPreview(null);
        } finally {
            setUploading(false);
        }
    };

    if (!user) {
        return <div className="text-center mt-10">Please login to view your profile.</div>;
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // Helper to get status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'accepted': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'accepted': return <CheckCircle size={16} />;
            case 'rejected': return <XCircle size={16} />;
            default: return <Clock size={16} />;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            {/* User Info Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 flex flex-col md:flex-row items-center gap-8">

                {/* Profile Image Section */}
                <div className="relative group">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100 bg-gray-100 flex-shrink-0 relative">
                        {preview ? (
                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        ) : user.profileImage ? (
                            <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-300">
                                <User size={48} />
                            </div>
                        )}

                        {/* Loading Overlay */}
                        {uploading && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                            </div>
                        )}
                    </div>

                    {/* Edit Button */}
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="absolute bottom-0 right-0 p-2.5 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 disabled:opacity-70 disabled:cursor-not-allowed"
                        title="Change Profile Photo"
                    >
                        <Camera size={18} />
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        className="hidden"
                        accept="image/*"
                    />
                </div>

                <div className="text-center md:text-left flex-grow">
                    <h1 className="text-3xl font-bold text-gray-800 mb-1">{user.name}</h1>
                    <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2">
                        {user.email}
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-600 uppercase tracking-wide border border-gray-200">
                            {user.role}
                        </span>
                        {/* More badges can go here */}
                    </div>
                </div>
            </div>

            {/* Applications List */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Briefcase className="text-blue-600" />
                Application History
            </h2>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                    {error}
                </div>
            )}

            {applications.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center text-gray-500">
                    <Briefcase size={48} className="mx-auto mb-4 text-gray-300" />
                    <p className="text-lg">You haven't applied to any internships or events yet.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {applications.map((app) => (
                        <div key={app._id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                                <div>
                                    {app.internshipId ? (
                                        <>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                                {app.internshipId.role}
                                            </h3>
                                            <p className="text-gray-600 font-medium">{app.internshipId.company}</p>
                                            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                                <Briefcase size={14} />
                                                <span>Internship</span>
                                            </div>
                                        </>
                                    ) : app.eventId ? (
                                        <>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                                {app.eventId.title}
                                            </h3>
                                            <p className="text-gray-600 font-medium">{app.eventId.college}</p>
                                            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                                <Calendar size={14} />
                                                <span>Event</span>
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-red-500">Item removed</p>
                                    )}
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="text-xs text-gray-400 mb-1">Applied on</p>
                                        <p className="text-sm font-medium text-gray-700">
                                            {new Date(app.appliedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold ${getStatusColor(app.status)}`}>
                                        {getStatusIcon(app.status)}
                                        <span className="capitalize">{app.status}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Profile;
