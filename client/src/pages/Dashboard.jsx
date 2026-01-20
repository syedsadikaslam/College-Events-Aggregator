import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { fetchEvents, fetchInternships } from "../services/api";
import TrendingOpportunities from "../components/TrendingOpportunities";
import CampusEvents from "../components/CampusEvents";
import { Briefcase, Sparkles, ArrowUpRight } from 'lucide-react'; 

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  // Smooth scroll ke liye ref setup
  const campusEventsRef = useRef(null);

  const scrollToEvents = () => {
    campusEventsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [eventsData, internshipsData] = await Promise.all([
          fetchEvents(),
          fetchInternships(),
        ]);
        setEvents(eventsData);
        setInternships(internshipsData);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 mb-4"></div>
        <p className="text-slate-500 font-medium animate-pulse">
          Setting up your career portal...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* --- PREMIUM HERO SECTION --- */}
      <header className="relative bg-[#0a192f] text-white pt-16 pb-32 overflow-hidden z-10">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-block px-6 py-2 mb-8 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
            <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase">
              Your Career Upgrade Starts Here
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold mb-8 tracking-tighter">
            Intern<span className="text-blue-500 italic">X</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-slate-300 mb-12 font-medium leading-relaxed">
            The ultimate destination to discover high-impact internships and
            career-defining college events. Crafted by{" "}
            <span className="text-white border-b-2 border-blue-500">Sadik</span>{" "}
            for the next generation of leaders.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mt-12">
    {/* PRIMARY: Explore Internships (Elite Glow Design) */}
    <Link 
        to="/all-internships" 
        className="group relative flex items-center gap-3 bg-blue-600 text-white px-7 py-3.5 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:bg-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] active:scale-95 overflow-hidden"
    >
        {/* Subtle Inner Reflection Layer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50"></div>
        
        <Briefcase size={18} className="relative z-10 group-hover:rotate-12 transition-transform" />
        <span className="relative z-10">Explore Internships</span>
        <ArrowUpRight size={16} className="relative z-10 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        
        {/* Animated Shine Effect */}
        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 opacity-40 group-hover:animate-[shine_1s_ease-in-out]" />
    </Link>

    {/* SECONDARY: Hosted Events (Neumorphic Glass Design) */}
    <Link 
        to="/all-events" 
        className="group flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 text-white/90 px-7 py-3.5 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-white active:scale-95"
    >
        <Sparkles size={18} className="text-blue-400 group-hover:animate-pulse" />
        <span>Hosted Events</span>
        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse group-hover:bg-blue-400"></div>
    </Link>
</div>
        </div>
      </header>

      {/* --- VALUE PROPS --- */}
      <div className="container mx-auto px-4 -mt-16 mb-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <ValueCard
            title="Top MNCs"
            label="Verified Partners"
            detail="Work with the biggest names in the industry."
            icon="🏢"
          />
          <ValueCard
            title="High Pay"
            label="Premium Stipends"
            detail="Best-in-class remuneration for your hard work."
            icon="💰"
          />
          <ValueCard
            title="Fast Track"
            label="Instant Hiring"
            detail="Direct access to hiring managers and teams."
            icon="⚡"
          />
          <ValueCard
            title="Certify"
            label="Global Credibility"
            detail="Build a resume that stands out worldwide."
            icon="🌍"
          />
        </div>
      </div>

      <main className="container mx-auto px-4 pb-24 relative z-10">
        {/* Trending Section */}
        <TrendingOpportunities
          internships={internships}
          EmptyState={EmptyState}
        />

        {/* Workflow Section */}
        <section className="bg-[#f8fafc] rounded-[3rem] p-12 md:p-20 border border-slate-100 my-24">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Hiring Made Simple
            </h2>
            <p className="text-slate-500 text-xl">
              Land your next role in four easy steps on InternX.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <WorkflowStep
              num="1"
              title="Build Profile"
              desc="Create a professional profile that recruiters love."
            />
            <WorkflowStep
              num="2"
              title="Find Roles"
              desc="Browse thousands of tailored internship listings."
            />
            <WorkflowStep
              num="3"
              title="Quick Apply"
              desc="Send your application with just a single click."
            />
            <WorkflowStep
              num="4"
              title="Get Hired"
              desc="Interview with top teams and start your journey."
            />
          </div>
        </section>

        {/* Campus Events with Ref for scrolling */}
        <div ref={campusEventsRef} className="pt-8">
          <CampusEvents events={events} EmptyState={EmptyState} />
        </div>
      </main>
    </div>
  );
};

// Internal Helper Components
const ValueCard = ({ title, label, detail, icon }) => (
  <div className="bg-white p-8 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 text-center transition-all hover:-translate-y-2 hover:shadow-blue-500/10 group">
    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-2xl font-black text-slate-900 mb-1">{title}</h3>
    <p className="text-blue-600 font-bold text-sm mb-3 uppercase tracking-widest">
      {label}
    </p>
    <p className="text-slate-400 text-xs leading-relaxed font-medium">
      {detail}
    </p>
  </div>
);

const WorkflowStep = ({ num, title, desc }) => (
  <div className="text-center relative">
    <div className="w-16 h-16 bg-blue-600 text-white text-2xl font-black rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-600/30">
      {num}
    </div>
    <h4 className="text-xl font-bold text-slate-900 mb-3">{title}</h4>
    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

const EmptyState = ({ message }) => (
  <div className="text-center py-24 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
    <p className="text-slate-400 text-lg font-medium">{message}</p>
  </div>
);

export default Dashboard;