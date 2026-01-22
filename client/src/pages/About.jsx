import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Code2,
  Globe2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Database,
  Layout,
  Cpu,
  Users2,
} from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  // Navigation Handler
  const handleGetStarted = () => {
    navigate("/all-internships");
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white antialiased">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-30 -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-indigo-50 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[11px] font-bold uppercase tracking-[0.2em] mb-10 shadow-xl shadow-slate-200">
            <Sparkles size={14} className="text-blue-400" /> Redefining Opportunity
          </div>

          <h1 className="text-6xl md:text-[7rem] font-black tracking-tighter leading-[0.85] mb-10 text-slate-950">
            Empowering the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Next Generation.
            </span>
          </h1>

          <p className="max-w-2xl text-xl text-slate-500 font-medium leading-relaxed mb-12">
            The most sophisticated ecosystem for college events and internships.
            We transform scattered data into a streamlined, high-performance
            experience for the modern student.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Compact Refined Buttons */}
            <button 
              onClick={handleGetStarted}
              className="group px-8 py-3.5 bg-blue-600 text-white rounded-xl font-bold text-base hover:bg-slate-900 transition-all shadow-xl shadow-blue-100 flex items-center gap-2 active:scale-95"
            >
              Get Started <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-3.5 bg-white border border-slate-200 text-slate-900 rounded-xl font-bold text-base hover:bg-slate-50 transition-all active:scale-95">
              Our Roadmap
            </button>
          </div>
        </div>
      </section>

      {/* --- BENTO GRID SECTION --- */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 bg-slate-50 rounded-[3rem] p-12 flex flex-col justify-between border border-slate-100 group hover:bg-white hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-10 border border-slate-100">
                <Database className="text-blue-600" size={28} />
              </div>
              <h3 className="text-4xl font-black mb-6 tracking-tight text-slate-950">
                One Platform. <br />
                Infinite Possibilities.
              </h3>
              <p className="text-slate-500 text-lg leading-relaxed max-w-md">
                We believe opportunity should be universal. Our platform
                consolidates thousands of verified events and internships into a
                single, intelligent interface.
              </p>
            </div>
            <div className="absolute right-[-5%] bottom-[-5%] opacity-5 group-hover:opacity-10 transition-opacity">
              <Layout size={400} />
            </div>
          </div>

          <div className="md:col-span-4 bg-blue-600 rounded-[3rem] p-12 text-white flex flex-col justify-between items-start relative overflow-hidden group">
            <Globe2 className="absolute top-[-20px] right-[-20px] text-white/10 group-hover:rotate-12 transition-transform duration-700" size={180} />
            <h4 className="text-blue-200 font-bold uppercase tracking-widest text-xs">National Reach</h4>
            <div>
              <div className="text-7xl font-black tracking-tighter mb-2">150+</div>
              <p className="text-blue-100 font-bold text-xl leading-snug">Institutions connected across India.</p>
            </div>
          </div>

          <div className="md:col-span-4 bg-slate-900 rounded-[3rem] p-10 text-white border border-slate-800">
            <Cpu className="text-blue-400 mb-8" size={40} />
            <h4 className="text-2xl font-bold mb-3 tracking-tight">Optimized Stack</h4>
            <p className="text-slate-400 leading-relaxed font-medium">High-concurrency architecture to handle massive data syncs.</p>
          </div>

          <div className="md:col-span-4 bg-white border border-slate-200 rounded-[3rem] p-10 flex flex-col justify-between hover:border-blue-500 transition-all">
            <ShieldCheck className="text-blue-600 mb-8" size={40} />
            <div>
              <h4 className="text-2xl font-bold mb-3 tracking-tight italic text-slate-950">Verified Quality</h4>
              <p className="text-slate-500 font-medium">Every listing undergoes a multi-layer verification process.</p>
            </div>
          </div>

          <div className="md:col-span-4 bg-slate-100 rounded-[3rem] p-10 flex flex-col justify-between group">
            <div className="flex justify-between items-start">
              <Users2 className="text-slate-900" size={40} />
              <div className="px-3 py-1 bg-white rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200">Live</div>
            </div>
            <h4 className="text-2xl font-bold mt-8 tracking-tight italic text-slate-950">10K+ Students</h4>
            <p className="text-slate-500 font-medium tracking-tight leading-snug">The fastest growing student ecosystem.</p>
          </div>
        </div>
      </section>

      {/* --- TECHNICAL ARCHITECTURE --- */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-2 text-blue-600 font-bold mb-6 italic tracking-wide text-sm underline underline-offset-4 decoration-2">
              <Code2 size={20} /> SYSTEM CORE
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-8 text-slate-950">Built for Scalability.</h2>
            <p className="text-lg text-slate-500 leading-relaxed mb-8 font-medium">
              Designed for the high-availability MERN stack, managing 500+ data sources simultaneously with zero latency.
            </p>
            <ul className="space-y-4">
              {["High-Performance Aggregation", "End-to-End Encryption", "Semantic Search Technology"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-bold text-slate-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-1/2 w-full aspect-video bg-slate-100 rounded-[3rem] overflow-hidden relative border border-slate-200 shadow-2xl shadow-blue-50">
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" 
              alt="Architecture" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
            />
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-slate-950 rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
              Stop Searching. <br /> 
              <span className="text-blue-500 italic underline decoration-white decoration-4 underline-offset-[12px]">Start Discovery.</span>
            </h2>
            <p className="text-slate-400 text-xl mb-12 max-w-xl mx-auto font-medium">
              Join thousands of students and mentors redefining career discovery.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
              <button 
                onClick={handleGetStarted}
                className="group relative px-8 py-3.5 bg-blue-600 text-white rounded-xl font-bold text-base overflow-hidden transition-all duration-300 hover:bg-blue-700 hover:shadow-[0_8px_25px_-8px_rgba(37,99,235,0.5)] active:scale-95 flex items-center gap-2"
              >
                <span className="relative z-10 text-white">Join Now — It's Free</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
              <button className="px-8 py-3.5 bg-white/5 border border-slate-700 text-slate-300 rounded-xl font-semibold text-base backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-slate-500 active:scale-95">
                Partner with Us
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="py-12 border-t border-slate-100 text-center">
        <p className="text-slate-300 font-black tracking-[0.4em] uppercase text-[10px]">
          College Events Aggregator &copy; 2026
        </p>
      </footer>
    </div>
  );
};

export default About;