const EventCard = ({ event }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                        <p className="text-sm text-blue-600 font-medium mb-4">{event.college}</p>
                    </div>
                    <div className="text-right">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
                            {new Date(event.date).toLocaleDateString()}
                        </span>
                    </div>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                    Register Now
                </a>
            </div>
        </div>
    );
};

export default EventCard;
