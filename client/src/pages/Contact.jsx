import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  MessageSquare, 
  Clock, 
  Globe, 
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log("Message Sent:", formData);
    alert("Thank you! Your message has been received.");
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white antialiased">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 bg-[#fcfcfd] border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
            <MessageSquare size={14} /> Get In Touch
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8">
            Let's Start a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic underline decoration-blue-100 underline-offset-8">Conversation.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-500 font-medium leading-relaxed">
            Have a question about an internship, partnership, or just want to say hi? 
            Our dedicated support team is here to help you navigate your journey.
          </p>
        </div>
      </section>

      {/* --- CONTACT GRID --- */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Side: Contact Information */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h2 className="text-3xl font-black tracking-tight mb-6">Contact Information</h2>
              <p className="text-slate-500 text-lg mb-10">
                Reach out to us through any of these channels. We usually respond within 24 hours.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-400 uppercase text-[10px] tracking-widest mb-1">Email Us</h4>
                    <p className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer">support@collegeaggregator.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-400 uppercase text-[10px] tracking-widest mb-1">Call Support</h4>
                    <p className="text-lg font-bold text-slate-900">+91 72540 87502</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-400 uppercase text-[10px] tracking-widest mb-1">Our Headquarters</h4>
                    <p className="text-lg font-bold text-slate-900">Patna, Bihar, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Support Badge */}
            <div className="p-8 bg-slate-950 rounded-[2.5rem] text-white relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="text-blue-400" size={20} />
                  <span className="text-xs font-black tracking-widest uppercase opacity-60">Operating Hours</span>
                </div>
                <p className="text-xl font-bold mb-2">Mon - Sat: 9:00 AM - 7:00 PM</p>
                <p className="text-slate-400 text-sm italic">Response time: &lt; 2 hours during office hours.</p>
              </div>
              <Globe size={150} className="absolute -bottom-10 -right-10 text-white/5 group-hover:rotate-45 transition-transform duration-1000" />
            </div>
          </div>

          {/* Right Side: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-blue-50">
              <h3 className="text-2xl font-black mb-8 tracking-tight">Send a Secure Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Md Sadik"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-600 transition-all font-medium"
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="sadik@example.com"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-600 transition-all font-medium"
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Subject</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Internship Inquiry"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-600 transition-all font-medium"
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Your Message</label>
                  <textarea 
                    rows="5"
                    required
                    placeholder="Tell us how we can help you..."
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-600 transition-all font-medium resize-none"
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full group px-8 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-slate-950 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                  Send Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;