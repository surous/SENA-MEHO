"use client";

import { useSession } from "next-auth/react";
import { 
  Calendar, 
  Clock, 
  FileText, 
  PlusCircle, 
  ChevronRight,
  ClipboardList,
  Activity,
  Droplets,
  Heart,
  Scale,
  Bell,
  ArrowUpRight,
  Stethoscope,
  MapPin,
  ShieldCheck,
  Star
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PatientDashboard() {
  const { data: session } = useSession();

  const healthMetrics = [
    { label: "Heart Rate", value: "72", unit: "bpm", icon: Heart, color: "text-red-500", bg: "bg-red-50", trend: "+2" },
    { label: "Blood Pressure", value: "120/80", unit: "mmHg", icon: Activity, color: "text-blue-500", bg: "bg-blue-50", trend: "Normal" },
    { label: "BMI", value: "22.4", unit: "Normal", icon: Scale, color: "text-green-500", bg: "bg-green-50", trend: "-0.5" },
    { label: "Blood Sugar", value: "98", unit: "mg/dL", icon: Droplets, color: "text-amber-500", bg: "bg-amber-50", trend: "Stable" },
  ];

  const upcomingAppointment = {
    doctor: "Dr. Sarah Wilson",
    specialty: "Senior Cardiologist",
    date: "Tomorrow, Jan 7",
    time: "10:00 AM - 10:30 AM",
    image: "/assets/dr_sarah_wilson.png",
    location: "Main Clinic, Room 402"
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header Section */}
        <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center space-x-3 text-blue-600 font-black tracking-widest uppercase text-xs">
              <span className="w-8 h-px bg-blue-600"></span>
              <span>Patient Command Center</span>
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">
              Hello, <span className="text-blue-600">{session?.user?.name?.split(' ')[0] || "Patient"}</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium max-w-2xl">
              Track your vitals, manage appointments, and access your medical history in one secure place.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-2 px-4 h-16">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center relative">
                   <Bell className="w-5 h-5 text-amber-600" />
                   <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="pr-4">
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">System Status</div>
                   <div className="text-sm font-bold text-slate-900">2 Notifications</div>
                </div>
             </div>
             <Link 
                href="/patient/book"
                className="h-16 inline-flex items-center space-x-3 bg-slate-900 text-white px-8 rounded-2xl font-black hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200 hover:shadow-blue-200 group"
              >
                <PlusCircle className="w-6 h-6" />
                <span>Book Appointment</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
          </div>
        </div>

        {/* Health Metrics Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {healthMetrics.map((metric, index) => (
            <div key={index} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col justify-between group hover:border-blue-200 transition-all cursor-pointer relative overflow-hidden">
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl ${metric.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <metric.icon className={`w-7 h-7 ${metric.color}`} />
                </div>
                <div className="space-y-1">
                  <div className="text-slate-500 text-xs font-black uppercase tracking-widest">{metric.label}</div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-black text-slate-900 tracking-tight">{metric.value}</span>
                    <span className="text-sm font-bold text-slate-400 uppercase">{metric.unit}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold">
                 <span className="text-slate-400">Trend</span>
                 <span className={metric.trend.includes('-') || metric.trend === 'Normal' || metric.trend === 'Stable' ? 'text-green-500' : 'text-red-500'}>
                    {metric.trend}
                 </span>
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <ArrowUpRight className="w-5 h-5 text-slate-300" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          {/* Left Column: Appointments and Actions */}
          <div className="xl:col-span-8 space-y-10">
            <section>
              <div className="flex items-center justify-between mb-6 px-2">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center space-x-3">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  <span>Next Clinical Visit</span>
                </h2>
                <Link href="/patient/appointments" className="text-sm font-black text-blue-600 hover:underline underline-offset-4">SCHEDULE OVERVIEW</Link>
              </div>
              
              <div className="group bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/60 overflow-hidden hover:shadow-blue-100 transition-all">
                <div className="p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-10">
                  <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                    <div className="absolute inset-0 bg-blue-100 rounded-[2.5rem] rotate-6 group-hover:rotate-12 transition-transform"></div>
                    <img 
                      src={upcomingAppointment.image} 
                      alt={upcomingAppointment.doctor} 
                      className="relative w-full h-full object-cover rounded-[2.5rem] shadow-xl"
                    />
                  </div>
                  
                  <div className="flex-grow space-y-6">
                    <div>
                      <div className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
                        Confirmed Appointment
                      </div>
                      <h3 className="text-3xl font-black text-slate-900">{upcomingAppointment.doctor}</h3>
                      <p className="text-lg text-slate-500 font-bold">{upcomingAppointment.specialty}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3 text-slate-700">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="font-bold">{upcomingAppointment.time}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-slate-700">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="font-bold">{upcomingAppointment.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                     <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-600 transition-all shadow-lg active:scale-95">
                        Prepare Visit
                     </button>
                     <button className="text-slate-400 font-bold py-3 hover:text-red-500 transition-colors text-sm">
                        Reschedule
                     </button>
                  </div>
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                  <div className="relative z-10">
                    <FileText className="w-10 h-10 text-blue-400 mb-6" />
                    <h3 className="text-2xl font-black mb-2">Medical History</h3>
                    <p className="text-slate-400 font-medium mb-8">Access your laboratory results, prescriptions, and imaging reports.</p>
                    <button className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white py-4 rounded-xl font-black hover:bg-white/20 transition-all flex items-center justify-center space-x-2">
                       <span>Open Records</span>
                       <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
               </div>

               <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-20 group-hover:scale-110 transition-transform duration-700">
                    <img 
                       src="/assets/med_research.png" 
                       alt="Medical Science" 
                       className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative z-10">
                    <Stethoscope className="w-10 h-10 text-white/80 mb-6" />
                    <h3 className="text-2xl font-black mb-2">Health Library</h3>
                    <p className="text-blue-100 font-medium mb-8">Personalized medical articles and tips tailored for your condition.</p>
                    <button className="w-full bg-white text-blue-600 py-4 rounded-xl font-black hover:bg-slate-50 transition-all flex items-center justify-center space-x-2">
                       <span>Explore Library</span>
                       <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="absolute top-0 right-0 p-10 opacity-20 group-hover:rotate-12 transition-transform">
                     <ClipboardList className="w-24 h-24" />
                  </div>
               </div>
            </div>
          </div>

          {/* Right Column: Notifications and Vitals */}
          <div className="xl:col-span-4 space-y-10">
            <section>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6 px-2">Clinical Reports</h2>
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 p-8 space-y-6">
                 {[
                   { title: "Lab Results Ready", time: "2 hours ago", desc: "Your blood work analysis is now available for review.", color: "blue", icon: FileText },
                   { title: "Prescription Refill", time: "Yesterday", desc: "Dr. Sarah Wilson authorized your medication refill.", color: "green", icon: ClipboardList },
                   { title: "Invoice Paid", time: "Jan 4, 2026", desc: "Payment for last consultation was successfully processed.", color: "slate", icon: Activity }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-4 group cursor-pointer">
                      <div className={`w-12 h-12 rounded-xl bg-${item.color}-50 flex-shrink-0 flex items-center justify-center group-hover:bg-blue-600 transition-colors`}>
                         <item.icon className={`w-5 h-5 text-${item.color}-600 group-hover:text-white transition-colors`} />
                      </div>
                      <div className="space-y-1">
                         <div className="flex items-center justify-between">
                            <h4 className="font-black text-slate-900 text-sm">{item.title}</h4>
                            <span className="text-[10px] font-bold text-slate-400">{item.time}</span>
                         </div>
                         <p className="text-slate-500 text-xs font-medium leading-relaxed">{item.desc}</p>
                      </div>
                   </div>
                 ))}
                 <button className="w-full text-slate-400 font-black text-xs uppercase tracking-widest pt-4 hover:text-blue-600 transition-colors">
                    View Notification History
                 </button>
              </div>
            </section>

            {/* Insurance Card Widget */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-300">
               <div className="relative z-10">
                  <div className="flex justify-between items-start mb-12">
                     <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md">
                        <ShieldCheck className="w-6 h-6 text-blue-400" />
                     </div>
                     <div className="text-right">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Insurance Provider</div>
                        <div className="text-sm font-bold">Aetna Health Premium Plus</div>
                     </div>
                  </div>
                  <div className="space-y-6">
                     <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Policy Member</div>
                        <div className="text-xl font-black">{session?.user?.name || "Patient Member"}</div>
                     </div>
                     <div className="flex justify-between items-end">
                        <div>
                           <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Member ID</div>
                           <div className="text-lg font-mono font-bold tracking-widest text-blue-300">SENA-8892-0012</div>
                        </div>
                        <div className="w-12 h-12 bg-white rounded-lg p-1">
                           <div className="w-full h-full bg-slate-100 flex items-center justify-center border border-slate-200">
                              <span className="text-[8px] font-black text-slate-900">SENA</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="absolute top-1/2 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>

            {/* Weekly Wellness Goals */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 p-8">
               <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  <span>Wellness Goals</span>
               </h3>
               <div className="space-y-4">
                  {[
                    { goal: "Drink 2.5L Water", progress: 80, color: "blue" },
                    { goal: "30min Aerobics", progress: 60, color: "green" },
                    { goal: "Sleep 8 Hours", progress: 100, color: "purple" }
                  ].map((g, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between text-xs font-black uppercase tracking-widest italic">
                          <span className="text-slate-500">{g.goal}</span>
                          <span className={`text-${g.color}-600`}>{g.progress}%</span>
                       </div>
                       <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                          <div 
                             className={`h-full bg-${g.color}-500 rounded-full transition-all duration-1000`} 
                             style={{ width: `${g.progress}%` }}
                          ></div>
                       </div>
                    </div>
                  ))}
               </div>
               <button className="w-full mt-8 py-4 bg-slate-50 rounded-2xl text-slate-400 font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">
                  Set New Goal
               </button>
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
               <h3 className="text-xl font-black mb-6 flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-blue-400" />
                  <span>AI Health Insights</span>
               </h3>
               <div className="space-y-6">
                  <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                     <div className="text-blue-400 text-xs font-black uppercase mb-2">Observation</div>
                     <p className="text-sm font-medium text-slate-300">Your average heart rate has decreased by 3% this week during rest.</p>
                  </div>
                  <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                     <div className="text-green-400 text-xs font-black uppercase mb-2">Recommendation</div>
                     <p className="text-sm font-medium text-slate-300">Increase water intake by 500ml daily based on your current activity levels.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
