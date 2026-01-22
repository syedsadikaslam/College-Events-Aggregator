import React from 'react';
import { Mail, Clock, CheckCircle2, PhoneCall } from 'lucide-react';

const Support = () => {
  // Direct call handler
  const handleCall = () => {
    window.location.href = "tel:+917254087502";
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      
      {/* --- Header Section --- */}
      <section className="pt-20 pb-12 px-6 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-slate-950">Support Hub</h1>
        <p className="text-lg text-slate-500 leading-relaxed font-medium">
          Professional technical assistance and institutional partnership inquiries.
        </p>
      </section>

      {/* --- Status Banner --- */}
      <div className="bg-slate-50 py-4 px-6 border-y border-slate-100 mb-12">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-500" />
            <span className="text-slate-600">Infrastructure: Operational</span>
          </div>
          <span className="hidden sm:block italic">Response Time: &lt; 24 Hours</span>
        </div>
      </div>

      {/* --- Content Grid --- */}
      <section className="px-6 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 pb-20">
        
        {/* Technical Division */}
        <div className="space-y-5">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Mail size={20} />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-slate-900">Technical Support</h3>
          <p className="text-slate-500 text-sm leading-relaxed font-medium">
            Dedicated support for system architecture, data synchronization, and portal access inquiries.
          </p>
          <p className="text-blue-600 font-bold text-lg">support@collegeaggregator.com</p>
        </div>

        {/* Schedule Division */}
        <div className="space-y-5">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Clock size={20} />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-slate-900">Operating Hours</h3>
          <p className="text-slate-500 text-sm leading-relaxed font-medium">
            Our engineering team is active Monday through Saturday, 09:00 AM to 07:00 PM IST.
          </p>
          <p className="text-slate-950 font-bold text-lg tracking-tight italic">Active Monitoring</p>
        </div>

      </section>

      {/* --- Interactive Contact Section --- */}
      <section className="px-6 pb-24 max-w-4xl mx-auto">
        <div className="bg-slate-950 rounded-[2.5rem] p-10 md:p-14 text-white text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl">
          <div className="max-w-md">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">Direct Assistance</h2>
            <p className="text-slate-400 text-sm italic font-medium">
              Click below to initiate a direct call with our authorized support representative.
            </p>
          </div>
          
          <button 
            onClick={handleCall}
            className="group flex items-center gap-3 bg-white text-slate-950 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all duration-300 active:scale-95 shadow-xl shadow-white/5"
          >
            <PhoneCall size={18} className="group-hover:rotate-12 transition-transform" />
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default Support;