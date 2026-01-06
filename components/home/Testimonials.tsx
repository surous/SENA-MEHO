"use client";

import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Abdiwahab Mohamed",
      role: "Business Consultant",
      text: "The medical care at Sena is second to none. The digital portal made booking my cardiology checkup incredibly smooth. Highly recommended!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      rating: 5
    },
    {
      name: "Sarah Chen",
      role: "Tech Lead",
      text: "I was impressed by the high-tech facilities and the professionalism of Dr. Sena. The patient dashboard gives me peace of mind about my records.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
      rating: 5
    },
    {
      name: "Marcus Miller",
      role: "Athletic Coach",
      text: "Speed and reliability are what I look for. Sena Medical delivered both during my emergency visit last month. A world-class institution.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
      rating: 5
    }
  ];

  return (
    <section className="bg-white py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div>
            <h2 className="text-blue-600 font-black tracking-[0.2em] uppercase text-sm mb-4">Patient Stories</h2>
            <h3 className="text-5xl font-black text-slate-900 tracking-tighter">Trusted by Thousands <br /> Professionals.</h3>
          </div>
          <p className="text-xl text-slate-500 font-medium max-w-md">
            Our commitment to excellence is reflected in the lives of our patients. See what they have to say about Sena Medical.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-slate-50 p-10 rounded-[3rem] relative group hover:bg-blue-600 transition-all duration-500">
              <Quote className="absolute top-10 right-10 w-12 h-12 text-blue-100 group-hover:text-blue-500 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-lg text-slate-700 font-bold mb-10 leading-relaxed group-hover:text-white transition-colors">
                "{t.text}"
              </p>

              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover border-4 border-white shadow-lg" />
                <div>
                  <div className="font-black text-slate-900 group-hover:text-white transition-colors">{t.name}</div>
                  <div className="text-sm font-bold text-slate-400 group-hover:text-blue-200 transition-colors">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
