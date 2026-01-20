import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InternshipCard = ({ internship }) => {
    const { user, token } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleApply = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            await axios.post('http://localhost:5000/api/applications', { internshipId: internship._id }, config);
            alert('Application submitted successfully!');
            // Redirect or update UI state
            if (internship.applyLink) {
                window.open(internship.applyLink, '_blank');
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Application failed');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">{internship.role}</h3>
                        <p className="text-gray-600 font-medium">{internship.company}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                        {internship.stipend}
                    </span>
                </div>

                <div className="flex items-center text-gray-500 text-sm mb-4">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {internship.location}
                </div>

                <button
                    onClick={handleApply}
                    className="inline-flex items-center justify-center w-full px-4 py-2 border border-blue-600 text-blue-600 text-sm font-medium rounded-md hover:bg-blue-50 transition-colors"
                >
                    Apply Now
                </button>
            </div>
        </div>
    );
};

export default InternshipCard;
