import { Mail, Phone, MapPin, SendHorizontal } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-32 bg-white mb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-[4rem] p-12 lg:p-24 overflow-hidden relative shadow-2xl">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -mr-40 -mt-40" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="text-left space-y-12">
              <div>
                <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter mb-8 leading-tight">
                    Let's talk <br /> 
                    <span className="text-blue-400">about health.</span>
                </h2>
                <p className="text-2xl text-slate-400 font-bold leading-relaxed">
                    Our support team is ready to assist you with any medical or administrative inquires.
                </p>
              </div>

              <div className="space-y-10">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center">
                        <Phone className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-1">Emergency</p>
                        <p className="text-2xl font-black text-white">+1 (555) 755-SE NA</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center">
                        <Mail className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-1">Email Us</p>
                        <p className="text-2xl font-black text-white">care@sena.com</p>
                    </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 lg:p-16 rounded-[3rem] shadow-2xl">
                <form className="space-y-8">
                    <div className="space-y-4">
                        <label className="text-sm font-black text-slate-500 uppercase tracking-widest px-1">Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-slate-100 text-xl font-bold text-slate-900 focus:border-blue-600 outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-4">
                        <label className="text-sm font-black text-slate-500 uppercase tracking-widest px-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="john@email.com"
                            className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-slate-100 text-xl font-bold text-slate-900 focus:border-blue-600 outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-4">
                        <label className="text-sm font-black text-slate-500 uppercase tracking-widest px-1">How can we help?</label>
                        <textarea
                            rows={3}
                            placeholder="Tell us about your needs..."
                            className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-slate-100 text-xl font-bold text-slate-900 focus:border-blue-600 outline-none transition-all resize-none"
                        />
                    </div>
                    <button className="w-full bg-blue-600 text-white font-black py-6 rounded-2xl text-2xl hover:bg-slate-900 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-200 hover:shadow-none">
                        <span>Send Message</span>
                        <SendHorizontal className="w-7 h-7" />
                    </button>
                </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
