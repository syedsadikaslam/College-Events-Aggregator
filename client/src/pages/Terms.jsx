import React from 'react';
import { ShieldCheck, Scale, FileText, AlertCircle, ChevronRight, CheckCircle2 } from 'lucide-react';

const Terms = () => {
  const lastUpdated = "January 23, 2026";

  const legalSections = [
    {
      title: "Platform Usage",
      content: "Users are granted a non-exclusive license to access internship and event data for personal career development. Any automated data scraping or unauthorized extraction is strictly prohibited."
    },
    {
      title: "User Responsibilities",
      content: "You agree to provide accurate educational credentials. Misrepresentation of identity or academic standing will result in immediate termination of platform access."
    },
    {
      title: "Intellectual Property",
      content: "The system architecture, proprietary algorithms, and brand assets of the College Events Aggregator are the exclusive property of the development division."
    },
    {
      title: "Limitation of Liability",
      content: "While we verify all listings, we are not liable for the final hiring decisions of third-party institutions or the cancellation of external events."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white antialiased">
      
      {/* --- PREMIUM HERO SECTION --- */}
      <section className="pt-24 md:pt-32 pb-16 px-6 bg-slate-50 border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-blue-600 font-bold uppercase tracking-widest text-[10px] mb-6">
            <Scale size={16} /> Legal Operations
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-slate-950 mb-6 leading-tight">
            Terms of <br className="hidden sm:block" />
            <span className="text-blue-600 italic">Service.</span>
          </h1>
          <p className="max-w-2xl text-base md:text-xl text-slate-500 font-medium leading-relaxed">
            Please review the framework governing your use of our internship and event ecosystem. 
            By accessing this platform, you agree to these professional standards.
          </p>
        </div>
      </section>

      {/* --- QUICK STATUS BAR --- */}
      <section className="py-4 bg-white border-b border-slate-50 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-emerald-500" size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Document Verified: 2026</span>
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
            Last Updated: {lastUpdated}
          </span>
        </div>
      </section>

      {/* --- STRUCTURED LEGAL CONTENT --- */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Side: Summary Box */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 p-8 bg-blue-600 rounded-[2.5rem] text-white shadow-2xl shadow-blue-100">
              <FileText className="mb-6 opacity-50" size={32} />
              <h3 className="text-xl font-bold mb-4 tracking-tight">Executive Summary</h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-6 font-medium">
                Our terms ensure a fair, secure, and accurate environment for thousands of students and mentors.
              </p>
              <ul className="space-y-3">
                {['No Scraping', 'Accurate Data', 'Identity Safety'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                    <ShieldCheck size={14} /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side: Detailed Clauses */}
          <div className="lg:col-span-8 space-y-16">
            {legalSections.map((section, i) => (
              <div key={i} className="group border-l-2 border-slate-100 pl-8 hover:border-blue-600 transition-colors">
                <h2 className="text-2xl font-black mb-4 tracking-tight text-slate-950 flex items-center gap-2">
                  <span className="text-blue-600 text-sm italic font-medium">0{i + 1}.</span> {section.title}
                </h2>
                <p className="text-slate-500 text-lg font-medium leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROHIBITION ALERT --- */}
      <section className="px-4 md:px-6 pb-24 max-w-5xl mx-auto">
        <div className="bg-slate-950 rounded-[3rem] p-10 md:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-red-400 mb-6">
              <AlertCircle size={28} />
              <span className="font-black uppercase tracking-[0.3em] text-[10px]">Strict Enforcement</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">Misuse Protocol.</h2>
            <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md italic">
              Platform misuse, including fraudulent internship postings or data breaches, 
              is strictly prohibited and subject to legal action.
            </p>
          </div>
          <div className="relative z-10 w-full md:w-auto">
            <div className="p-8 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-xl text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Policy Version</p>
              <p className="text-2xl font-black">v2.1.0</p>
            </div>
          </div>
          {/* Subtle decoration */}
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[100px]"></div>
        </div>
      </section>
    </div>
  );
};

export default Terms;