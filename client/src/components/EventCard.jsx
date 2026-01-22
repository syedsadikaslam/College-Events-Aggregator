import { Calendar, MapPin, ArrowRight, Star } from 'lucide-react';

const EventCard = ({ event }) => {
    // Date formatting logic
    const eventDate = new Date(event.date);
    const day = eventDate.getDate();
    const month = eventDate.toLocaleString('default', { month: 'short' });

    return (
        <div className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full">
            
            {/* Top Accent: Vibrant Gradient for Events */}
            <div className="h-2 w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600"></div>

            <div className="p-6 flex flex-col flex-grow">
                
                {/* Header Section */}
                <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Featured Event</span>
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 leading-tight group-hover:text-pink-600 transition-colors duration-300">
                            {event.title}
                        </h3>
                    </div>

                    {/* Premium Date Badge */}
                    <div className="flex flex-col items-center justify-center bg-gray-900 text-white rounded-2xl p-3 min-w-[60px] shadow-lg shadow-gray-300 group-hover:bg-pink-600 transition-colors duration-500">
                        <span className="text-xl font-bold">{day}</span>
                        <span className="text-[10px] uppercase font-bold tracking-tighter">{month}</span>
                    </div>
                </div>

                {/* College Info with Glass-style badge */}
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-bold mb-6 border border-blue-100">
                    <MapPin className="w-4 h-4" />
                    {event.college}
                </div>

                {/* Event Description */}
                <div className="mb-8 flex-grow">
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 font-medium">
                        {event.description}
                    </p>
                </div>

                {/* Footer / Register Button */}
                <div className="mt-auto">
                    <a
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn relative flex items-center justify-between w-full bg-gray-50 hover:bg-gray-900 px-6 py-4 rounded-2xl transition-all duration-300 border border-gray-100 hover:border-transparent"
                    >
                        <span className="text-gray-900 group-hover:text-white font-bold text-sm">Register Now</span>
                        <div className="bg-white group-hover/btn:bg-pink-500 p-2 rounded-lg shadow-sm transition-all duration-300">
                            <ArrowRight className="w-4 h-4 text-gray-900 group-hover/btn:text-white" />
                        </div>
                    </a>
                </div>
            </div>

            {/* Subtle Overlay Background Detail */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>
    );
};

export default EventCard;