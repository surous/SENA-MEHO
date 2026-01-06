"use client";

import { useSession } from "next-auth/react";
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ChevronRight,
  Stethoscope,
  Notebook,
  Search,
  Filter,
  MoreVertical,
  Calendar as CalendarIcon,
  TrendingUp,
  UserCheck,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";

export default function DoctorDashboard() {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState([
    { id: "1", patientName: "John Doe", time: "10:00 AM", status: "APPROVED", reason: "Regular heart checkup", age: "45", lastVisit: "2 months ago" },
    { id: "2", patientName: "Jane Smith", time: "11:30 AM", status: "PENDING", reason: "Flu symptoms", age: "32", lastVisit: "1 week ago" },
    { id: "3", patientName: "Michael Brown", time: "02:00 PM", status: "COMPLETED", reason: "Post-surgery follow-up", age: "58", lastVisit: "3 days ago" },
    { id: "4", patientName: "Sarah Connor", time: "03:30 PM", status: "PENDING", reason: "Persistent headaches", age: "29", lastVisit: "First visit" },
  ]);

  const updateStatus = (id: string, newStatus: string) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  const clinicalStats = [
    { label: "Total Patients", value: "842", icon: Users, color: "text-blue-600", bg: "bg-blue-50", growth: "+12%" },
    { label: "Today's Schedule", value: "12", icon: Clock, color: "text-amber-600", bg: "bg-amber-50", growth: "3 Urgent" },
    { label: "Satisfaction Rate", value: "98%", icon: UserCheck, color: "text-green-600", bg: "bg-green-50", growth: "Top 5%" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Top Header */}
        <div className="mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <div className="flex items-center space-x-3 text-blue-600 font-black tracking-widest uppercase text-xs mb-2">
              <span className="w-8 h-px bg-blue-600"></span>
              <span>Clinical Workspace</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Clinical Overview: <span className="text-blue-600">{session?.user?.name || "Doctor"}</span>
            </h1>
            <p className="text-lg text-slate-500 font-bold mt-1">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group flex-grow lg:flex-grow-0">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
               <input 
                 type="text" 
                 placeholder="Search patient records..." 
                 className="w-full lg:w-72 pl-12 pr-6 py-4 rounded-2xl border border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-sm"
               />
            </div>
            <button className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:bg-slate-50 transition-colors relative">
               <AlertCircle className="w-6 h-6 text-slate-400" />
               <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Clinical Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {clinicalStats.map((stat, index) => (
            <div key={index} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/30 flex items-center justify-between group hover:border-blue-200 transition-all">
              <div className="flex items-center space-x-6">
                <div className={`w-16 h-16 rounded-[1.5rem] ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">{stat.label}</div>
                  <div className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</div>
                </div>
              </div>
              <div className="text-right">
                 <div className="inline-flex items-center space-x-1 text-green-500 font-black text-xs">
                    <TrendingUp className="w-3 h-3" />
                    <span>{stat.growth}</span>
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* Analytics & Resources Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
           {/* Patient Demographics */}
           <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
              <div className="flex items-center justify-between mb-8">
                 <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Patient Demographics</h3>
                    <p className="text-slate-400 text-sm font-bold">Clinical distribution by age group</p>
                 </div>
                 <select className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-500 outline-none">
                    <option>Weekly View</option>
                    <option>Monthly View</option>
                 </select>
              </div>
              <div className="h-72 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                       { age: '0-18', patients: 120, color: '#3b82f6' },
                       { age: '19-35', patients: 250, color: '#8b5cf6' },
                       { age: '36-50', patients: 380, color: '#ec4899' },
                       { age: '51-70', patients: 420, color: '#f59e0b' },
                       { age: '70+', patients: 180, color: '#10b981' },
                    ]}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="age" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} dy={10} />
                       <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                       <Bar dataKey="patients" radius={[8, 8, 0, 0]} barSize={40}>
                          { [120, 250, 380, 420, 180].map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'][index]} />
                          ))}
                       </Bar>
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Quick Resources */}
           <div className="lg:col-span-4 space-y-8">
              <div className="bg-slate-900 p-8 rounded-[3rem] text-white relative overflow-hidden group">
                 <div className="relative z-10">
                    <h3 className="text-xl font-black mb-6">Clinical Resources</h3>
                    <div className="grid grid-cols-2 gap-4">
                       {[
                         { label: "ICD-10", icon: Stethoscope },
                         { label: "Medication", icon: Notebook },
                         { label: "Guidelines", icon: Search },
                         { label: "Calculators", icon: Clock }
                       ].map((res, i) => (
                         <button key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-3 hover:bg-blue-600 transition-all">
                            <res.icon className="w-5 h-5 text-blue-400 group-hover:text-white" />
                            <span className="text-[10px] font-black uppercase tracking-widest">{res.label}</span>
                         </button>
                       ))}
                    </div>
                 </div>
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>
              </div>

              <div className="bg-blue-50 border border-blue-100 p-8 rounded-[3rem]">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                       <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                       <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Efficiency Score</div>
                       <div className="text-xl font-black text-slate-900">92/100</div>
                    </div>
                 </div>
                 <p className="text-xs font-bold text-slate-500 leading-relaxed">
                    You are performing 15% better than your monthly average targets. 
                    <span className="text-blue-600"> Keep it up!</span>
                 </p>
              </div>
           </div>
        </div>

        {/* Main Content: Schedule */}
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
          <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center space-x-3">
                 <CalendarIcon className="w-6 h-6 text-blue-600" />
                 <span>Daily Consultation Schedule</span>
              </h2>
              <p className="text-slate-500 font-bold mt-1">Review and manage your appointments for today.</p>
            </div>
            <div className="flex items-center gap-3">
               <button className="inline-flex items-center space-x-2 px-5 py-3 bg-slate-50 text-slate-600 border border-slate-100 rounded-xl font-black text-xs hover:bg-slate-100 transition-colors uppercase tracking-widest">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
               </button>
               <button className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-xs hover:bg-blue-600 transition-all shadow-lg uppercase tracking-widest">
                  <span>Export List</span>
               </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Patient Details</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Clinical Reason</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Schedule</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Consultation Tools</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {appointments.map((app) => (
                  <tr key={app.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-10 py-8">
                      <div className="flex items-center space-x-5">
                         <div className="w-12 h-12 rounded-[1rem] bg-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all text-xs">
                            {app.patientName.split(' ').map(n=>n[0]).join('')}
                         </div>
                         <div>
                            <div className="font-black text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{app.patientName}</div>
                            <div className="text-slate-400 text-xs font-bold uppercase tracking-tight">Age: {app.age} • Last visit: {app.lastVisit}</div>
                         </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                       <p className="text-slate-600 font-bold max-w-xs">{app.reason}</p>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex flex-col">
                        <span className="text-slate-900 font-black">{app.time}</span>
                        <span className="text-slate-400 text-xs font-bold">Duration: 30m</span>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-center italic">
                      <span className={`inline-flex px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        app.status === 'APPROVED' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                        app.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                        app.status === 'COMPLETED' ? 'bg-green-50 text-green-700 border border-green-100' :
                        'bg-red-50 text-red-700 border border-red-100'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center justify-end space-x-3">
                        {app.status === 'PENDING' && (
                          <>
                            <button 
                               onClick={() => updateStatus(app.id, "APPROVED")}
                               className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                               title="Approve Visit"
                            >
                              <CheckCircle2 className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => updateStatus(app.id, "CANCELLED")}
                              className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                              title="Cancel Visit"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          </>
                        )}
                        <Link 
                          href={`/doctor/patient/${app.id}`}
                          className="p-3 bg-slate-900 text-white rounded-xl hover:bg-blue-600 transition-all shadow-lg flex items-center space-x-2"
                        >
                          <Notebook className="w-5 h-5" />
                          <span className="text-xs font-black uppercase tracking-wider px-2">EMR</span>
                        </Link>
                        <button className="p-3 hover:bg-slate-100 rounded-xl transition-colors text-slate-400">
                           <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
             <button className="text-blue-600 font-black text-xs uppercase tracking-[0.2em] hover:underline underline-offset-8 transition-all">
                Load More Appointments
             </button>
          </div>
        </div>

        {/* Footer Support/Resources */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
           <div className="lg:col-span-3 bg-blue-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
              <div className="absolute inset-0 opacity-10 group-hover:scale-105 transition-transform duration-1000">
                 <img 
                    src="/assets/clinical_corridor.png" 
                    alt="Clinical Corridor" 
                    className="w-full h-full object-cover"
                 />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                 <div className="space-y-4">
                    <h3 className="text-3xl font-black tracking-tight">Clinical Research Portal</h3>
                    <p className="text-blue-100 text-lg font-medium max-w-xl">
                       Access the latest cardiovascular research and clinical trials directly from the Sena Medical database.
                    </p>
                    <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black shadow-xl hover:bg-slate-50 transition-all">
                       Explore Studies
                    </button>
                 </div>
                 <div className="flex-shrink-0">
                    <Stethoscope className="w-32 h-32 opacity-20 group-hover:scale-125 transition-transform duration-700" />
                 </div>
              </div>
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
           </div>

           <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-between">
              <div>
                 <h4 className="text-xl font-black mb-2 tracking-tight">Telemedicine Link</h4>
                 <p className="text-slate-400 text-sm font-medium">Generate a secure room for your next virtual consultation.</p>
              </div>
              <button className="w-full bg-blue-500 text-white font-black py-4 rounded-xl hover:bg-blue-600 transition-all text-sm mt-8 shadow-lg shadow-blue-500/20">
                 Start Video Sync
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
