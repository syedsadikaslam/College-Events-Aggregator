import React from 'react';
import { ShieldCheck, Eye, Lock, Database, Globe, UserCheck, Mail, ArrowRight, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
  const lastUpdated = "January 22, 2026";

  const sections = [
    {
      title: "Data Collection",
      icon: <Database className="text-blue-600" size={24} />,
      content: "We collect information that you provide directly to us, such as when you create an account, search for internships, or communicate with our support team. This includes your name, email address, and professional interests."
    },
    {
      title: "How We Use Data",
      icon: <Eye className="text-indigo-600" size={24} />,
      content: "Your data is used to personalize your experience, provide accurate aggregation results, and notify you of high-priority opportunities that match your profile. We use anonymized data to improve our system's architecture."
    },
    {
      title: "Data Protection",
      icon: <Lock className="text-emerald-600" size={24} />,
      content: "We implement industry-standard encryption (SSL/TLS) to protect your personal information. Our infrastructure is designed to prevent unauthorized access and ensure the integrity of your career data."
    },
    {
      title: "Third-Party Disclosure",
      icon: <Globe className="text-purple-600" size={24} />,
      content: "We strictly do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This excludes trusted partners who assist us in operating our platform, so long as those parties agree to keep this information confidential."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white antialiased">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 bg-slate-50 border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-8 w-fit">
            <ShieldCheck size={14} className="text-blue-600" /> Secure Ecosystem
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-6 text-slate-950">
            Privacy <span className="text-blue-600 italic">Policy.</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-slate-500 font-medium italic">
            <p>Last Updated: {lastUpdated}</p>
            <span className="hidden md:block">•</span>
            <p>Version 2.0.4 (Stable)</p>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Sidebar / Quick Links */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-24 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
              <h3 className="text-lg font-black mb-6 uppercase tracking-widest text-slate-400">Quick Navigation</h3>
              <nav className="space-y-4 font-bold text-sm">
                {sections.map((sec, i) => (
                  <a key={i} href={`#${sec.title.replace(/\s+/g, '-').toLowerCase()}`} className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors">
                    <ArrowRight size={14} /> {sec.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Policy Text */}
          <div className="lg:col-span-8">
            <div className="prose prose-slate max-w-none">
              <p className="text-xl text-slate-600 leading-relaxed mb-12">
                At College Events Aggregator, we value the trust you place in us. This policy outlines our commitment to transparency regarding your personal data and professional information.
              </p>

              <div className="space-y-16">
                {sections.map((section, index) => (
                  <div key={index} id={section.title.replace(/\s+/g, '-').toLowerCase()} className="scroll-mt-24">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
                        {section.icon}
                      </div>
                      <h2 className="text-3xl font-black tracking-tight text-slate-950">{section.title}</h2>
                    </div>
                    <p className="text-lg text-slate-500 leading-relaxed font-medium">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* User Consent Card */}
            <div className="mt-20 p-10 bg-blue-600 rounded-[3rem] text-white relative overflow-hidden group shadow-2xl shadow-blue-200">
              <div className="relative z-10">
                <UserCheck className="mb-6 text-blue-200" size={40} />
                <h3 className="text-3xl font-black mb-4 italic">Your Consent</h3>
                <p className="text-blue-100 text-lg leading-relaxed mb-8">
                  By using our platform, you hereby consent to our Privacy Policy and agree to its terms. We are committed to notifying you should any major changes occur in how we handle data.
                </p>
                <div className="flex gap-4">
                  <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
                    I Understand
                  </button>
                </div>
              </div>
              <ShieldCheck className="absolute -bottom-10 -right-10 text-white/10 group-hover:scale-110 transition-transform duration-700" size={200} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;