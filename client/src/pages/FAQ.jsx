import React, { useState } from 'react';
import { 
  Plus, 
  Minus, 
  HelpCircle, 
  Search, 
  MessageCircle, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Globe 
} from 'lucide-react';

const FAQ = () => {
  const [activeId, setActiveId] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "Is this platform free for all students?",
      answer: "Yes, our core mission is to democratize opportunity. The platform is 100% free for students to discover internships, events, and job openings.",
      category: "General"
    },
    {
      id: 2,
      question: "Do you provide internships directly?",
      answer: "No, we are an aggregation ecosystem. We collect, verify, and categorize opportunities from thousands of trusted sources into a single unified dashboard.",
      category: "Opportunities"
    },
    {
      id: 3,
      question: "How do you verify the opportunities?",
      answer: "Every listing undergoes a multi-layer validation process involving our proprietary algorithms and manual quality checks to eliminate spam or fraudulent posts.",
      category: "Security"
    },
    {
      id: 4,
      question: "Can I track my application status here?",
      answer: "Currently, we redirect you to the official provider's portal. However, you can save opportunities to your personal profile to manage your application roadmap.",
      category: "Features"
    },
    {
      id: 5,
      question: "How often is the data updated?",
      answer: "Our system synchronizes with over 500+ data sources every 15 to 30 minutes, ensuring you never miss a real-time deadline.",
      category: "Tech"
    }
  ];

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white antialiased">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 bg-slate-50 border-b border-slate-100 overflow-hidden">
        {/* Subtle background blur */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-[120px] opacity-50 -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-lg shadow-blue-200">
            <HelpCircle size={14} /> Knowledge Base
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8">
            How can we <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">Help you?</span>
          </h1>
          
          {/* Search Bar Integration */}
          <div className="max-w-xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search for questions..." 
              className="w-full pl-14 pr-6 py-5 bg-white border border-slate-200 rounded-3xl outline-none shadow-2xl shadow-blue-50 focus:ring-4 focus:ring-blue-500/5 focus:border-blue-600 transition-all font-medium"
            />
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          
          <div className="space-y-4">
            {faqData.map((faq) => (
              <div 
                key={faq.id} 
                className={`border rounded-3xl transition-all duration-300 ${activeId === faq.id ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
              >
                <button 
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest italic">{faq.category}</span>
                    <span className={`text-xl font-bold tracking-tight ${activeId === faq.id ? 'text-blue-600' : 'text-slate-900'}`}>
                      {faq.question}
                    </span>
                  </div>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-transform duration-300 ${activeId === faq.id ? 'bg-blue-600 border-blue-600 text-white rotate-180' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                    {activeId === faq.id ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeId === faq.id ? 'max-h-96 opacity-100 pb-8 px-8' : 'max-h-0 opacity-0'}`}>
                  <p className="text-slate-500 text-lg leading-relaxed font-medium">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* --- SUPPORT CTA --- */}
          <div className="mt-20 p-10 bg-slate-950 rounded-[3rem] text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <MessageCircle className="mx-auto text-blue-400 mb-6" size={40} />
              <h3 className="text-3xl font-black text-white mb-4 italic">Still have questions?</h3>
              <p className="text-slate-400 text-lg mb-8">If you couldn't find your answer, reach out to our support team.</p>
              <button className="inline-flex items-center gap-2 bg-white text-slate-950 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl">
                Contact Support <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- TRUST FOOTER SECTION --- */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <ShieldCheck size={32} className="mx-auto text-blue-600" />
            <h4 className="font-black italic uppercase text-xs tracking-[0.2em]">Privacy First</h4>
            <p className="text-slate-400 text-sm">Your data is encrypted and never sold to third parties.</p>
          </div>
          <div className="space-y-4">
            <Zap size={32} className="mx-auto text-blue-600" />
            <h4 className="font-black italic uppercase text-xs tracking-[0.2em]">Instant Sync</h4>
            <p className="text-slate-400 text-sm">Real-time updates from over 500+ global sources.</p>
          </div>
          <div className="space-y-4">
            <Globe size={32} className="mx-auto text-blue-600" />
            <h4 className="font-black italic uppercase text-xs tracking-[0.2em]">Global Scale</h4>
            <p className="text-slate-400 text-sm">Accessing opportunities from Tier-1 to Tier-3 cities.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;