"use client";

import { Users, Building2, Award, Heart pulse } from "lucide-react";

export default function Stats() {
  const stats = [
    { label: "Patients Served", value: "25k+", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Expert Doctors", value: "85+", icon: Award, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Medical Departments", value: "12+", icon: Building2, color: "text-green-600", bg: "bg-green-50" },
    { label: "Success Rate", value: "99.2%", icon: HeartPulse, color: "text-red-600", bg: "bg-red-50" },
  ];

  return (
    <section className="bg-slate-900 py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
         <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[150px]"></div>
         <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[150px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-blue-400 font-black tracking-[0.3em] uppercase text-sm mb-4">Sena Medical by the Numbers</h2>
          <h3 className="text-4xl lg:text-5xl font-black text-white tracking-tight">Global Excellence in Local Healthcare</h3>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/5 border border-white/10 backdrop-blur-md p-10 rounded-[3rem] text-center hover:bg-white/10 transition-all group">
              <div className={`w-16 h-16 rounded-2xl ${stat.bg} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="text-4xl lg:text-5xl font-black text-white mb-2 tracking-tighter">{stat.value}</div>
              <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
