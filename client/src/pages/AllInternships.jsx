import { useEffect, useState, useMemo } from 'react';
import { fetchInternships } from '../services/api';
import InternshipCard from '../components/InternshipCard';
import { Search, ArrowLeft, Briefcase, SlidersHorizontal, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';

const AllInternships = () => {
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchInternships();
                setInternships(data);
            } catch (error) {
                console.error('Failed to load internships');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const filteredInternships = useMemo(() => {
        return internships.filter(item => {
            const matchesSearch = item.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 item.company?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = activeFilter === 'All' || item.type === activeFilter;
            return matchesSearch && matchesFilter;
        });
    }, [internships, searchTerm, activeFilter]);

    if (loading) return <LoadingSkeleton />;

    return (
        <div className="bg-[#fcfdfe] min-h-screen selection:bg-blue-100 font-sans">
            {/* --- MINIMALIST TOP NAV --- */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
                <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
                    <Link to="/" className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-all text-xs font-bold uppercase tracking-wider">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Portal</span>
                    </Link>
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase tracking-tighter text-blue-700">
                            {filteredInternships.length} Openings Live
                        </span>
                    </div>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto px-6 pt-10 pb-24">
                {/* --- COMPACT HERO --- */}
                <header className="mb-10">
                    <div className="max-w-xl text-left mb-8">
                        <div className="flex items-center gap-2 mb-2">
                            <Briefcase className="text-blue-500" size={14} />
                            <span className="text-blue-600 font-bold text-[9px] uppercase tracking-[0.3em]">Career Opportunities</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                            Intern<span className="text-blue-600 italic">X</span> Openings
                        </h1>
                    </div>

                    {/* --- INTEGRATED SEARCH & FILTER ROW --- */}
                    <div className="flex flex-col lg:flex-row gap-4 items-center pb-8 border-b border-slate-50">
                        {/* Search Shell */}
                        <div className="w-full lg:w-72 relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
                            <input 
                                type="text"
                                placeholder="Search roles or companies..."
                                className="w-full bg-slate-50 border border-slate-200 p-2.5 pl-10 rounded-xl outline-none text-xs font-medium focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-600 transition-all shadow-sm"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Unified Filter Wrap (Side-by-side) */}
                        <div className="flex items-center p-1 bg-slate-100/50 border border-slate-200/40 rounded-xl shadow-sm backdrop-blur-md w-full lg:w-auto overflow-x-auto no-scrollbar">
                            <div className="flex items-center gap-2 px-3 py-1.5 border-r border-slate-200/60 mr-1">
                                <SlidersHorizontal size={12} className="text-slate-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">
                                    Filters
                                </span>
                            </div>
                            <div className="flex gap-1">
                                {['All', 'Remote', 'On-site', 'Tech'].map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => setActiveFilter(filter)}
                                        className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                                            activeFilter === filter 
                                            ? 'bg-white text-blue-600 shadow-sm border border-slate-200' 
                                            : 'text-slate-500 hover:text-blue-600 hover:bg-white/40'
                                        }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </header>

                {/* --- GRID --- */}
                {filteredInternships.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
                        <LayoutGrid className="mx-auto text-slate-200 mb-4" size={40} />
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">No matching roles found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredInternships.map((item) => (
                            <div key={item._id} className="transition-all duration-500 hover:-translate-y-2">
                                <InternshipCard internship={item} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// Minimal Skeleton Screen
const LoadingSkeleton = () => (
    <div className="bg-white min-h-screen p-12 max-w-6xl mx-auto">
        <div className="h-4 w-24 bg-slate-50 animate-pulse mb-6 rounded"></div>
        <div className="h-10 w-1/3 bg-slate-50 animate-pulse mb-12 rounded-xl"></div>
        <div className="grid grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <div key={i} className="h-72 bg-slate-50 animate-pulse rounded-2xl"></div>)}
        </div>
    </div>
);

export default AllInternships;