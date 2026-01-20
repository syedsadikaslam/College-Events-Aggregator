import { Link } from 'react-router-dom'; // Navigation ke liye Link zaroori hai
import EventCard from './EventCard';

const CampusEvents = ({ events, EmptyState }) => {
    return (
        <section className="py-8">
            {/* Header Section with Heading and View All Link */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
                <div className="flex items-center gap-6 flex-grow">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight whitespace-nowrap">
                        Campus Events
                    </h2>
                    <div className="hidden md:block flex-grow h-[2px] bg-slate-100"></div>
                </div>
                
                {/* View All Button */}
                <Link 
                    to="/all-events" 
                    className="group flex items-center gap-2 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-900 font-bold py-3 px-8 rounded-xl transition-all shadow-sm whitespace-nowrap"
                >
                    View All Events
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
            </div>

            {/* Events Grid Logic */}
            {events.length === 0 ? (
                <EmptyState message="No events scheduled today. Stay tuned!" />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {/* Dashboard par sirf pehle 6 events dikhayenge */}
                    {events.slice(0, 6).map((event) => (
                        <div key={event._id} className="transition-all duration-300 hover:-translate-y-2">
                            <EventCard event={event} />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default CampusEvents;