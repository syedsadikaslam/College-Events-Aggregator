import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Briefcase, MapPin, Calendar, ExternalLink, IndianRupee } from 'lucide-react'; // Icons ke liye

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
                headers: { Authorization: `Bearer ${token}` }
            };

            await axios.post('http://localhost:5000/api/applications', { internshipId: internship._id }, config);
            
            if (internship.applyLink) {
                window.open(internship.applyLink, '_blank');
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Application failed');
        }
    };

    return (
        <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full">
            {/* Top Gradient Bar */}
            <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600"></div>

            <div className="p-6 flex flex-col flex-grow">
                {/* Header: Role & Company */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                            {internship.role}
                        </h3>
                        <div className="flex items-center mt-1 text-gray-500">
                            <Briefcase className="w-4 h-4 mr-1.5" />
                            <span className="font-medium">{internship.company}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider shadow-sm border border-blue-100">
                            {internship.stipend}
                        </span>
                    </div>
                </div>

                {/* Badges: Location & Deadline */}
                <div className="flex flex-wrap gap-3 mb-5">
                    <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-full text-gray-600 text-xs font-semibold border border-gray-100">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-blue-500" />
                        {internship.location}
                    </div>
                    <div className="flex items-center bg-red-50 px-3 py-1.5 rounded-full text-red-600 text-xs font-semibold border border-red-100">
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        Ends: {internship.lastDate || 'Apply Soon'}
                    </div>
                </div>

                {/* Body: Detailed Description */}
                <div className="mb-6 flex-grow">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Job Description</h4>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 italic">
                        "{internship.description || 'No description provided by the recruiter.'}"
                    </p>
                </div>

                {/* Footer: Apply Button */}
                <div className="mt-auto">
                    <button
                        onClick={handleApply}
                        className="relative w-full group overflow-hidden bg-gray-900 text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:bg-blue-600 active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-gray-200"
                    >
                        <span>Apply Now</span>
                        <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InternshipCard;