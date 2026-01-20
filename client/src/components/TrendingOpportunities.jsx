import { Link } from 'react-router-dom';
import InternshipCard from './InternshipCard';

const TrendingOpportunities = ({ internships, EmptyState }) => {
    return (
        <section className="mb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Trending Opportunities</h2>
                    <p className="text-slate-500 mt-2 font-medium">Curated roles for InternX talent.</p>
                </div>
                {/* Button updated to Link */}
                <Link 
                    to="/all-internships" 
                    className="group flex items-center gap-2 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-900 font-bold py-3 px-8 rounded-xl transition-all shadow-sm whitespace-nowrap"
                >
                    View All Events
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
            </div>
            
            {/* Displaying first 6 internships as trending */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {internships.slice(0, 6).map((internship) => (
                    <InternshipCard key={internship._id} internship={internship} />
                ))}
            </div>
        </section>
    );
};

export default TrendingOpportunities;