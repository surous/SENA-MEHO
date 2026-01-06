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
  AlertCircle,
  FileText
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
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
  const [appointments, setAppointments] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [apptsRes, reportsRes] = await Promise.all([
        fetch("/api/appointments"),
        fetch("/api/health-reports")
      ]);
      const apptsData = await apptsRes.json();
      const reportsData = await reportsRes.json();
      
      if (Array.isArray(apptsData)) setAppointments(apptsData);
      if (Array.isArray(reportsData)) setReports(reportsData);
    } catch (error) {
      console.error("Doctor Dashboard Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      // In a real app, we'd have a PATCH /api/appointments/[id]
      // For now, let's simulate the update locally after a potential API call
      setAppointments(appointments.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      ));
      // Optional: fetch refreshed data
      // await fetchData();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const clinicalStats = [
    { label: "Total Patients", value: "842", icon: Users, color: "text-blue-600", bg: "bg-blue-50", growth: "+12%" },
    { label: "Today's Schedule", value: appointments.length.toString(), icon: Clock, color: "text-amber-600", bg: "bg-amber-50", growth: "Active" },
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

           {/* Quick Resources / Latest Reports */}
           <div className="lg:col-span-4 space-y-8">
              <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
                 <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span>Recent Patient Reports</span>
                 </h3>
                 <div className="space-y-4">
                    {reports.length > 0 ? reports.slice(0, 3).map((report, i) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all cursor-pointer">
                         <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{report.patient?.user?.name || "Patient"}</span>
                            <span className="text-[10px] font-bold text-slate-400">{new Date(report.createdAt).toLocaleDateString()}</span>
                         </div>
                         <p className="text-xs font-bold text-slate-600 line-clamp-2">{report.content}</p>
                      </div>
                    )) : (
                      <p className="text-slate-400 text-xs font-bold text-center py-6">No reports submitted yet.</p>
                    )}
                 </div>
              </div>

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
                {appointments.length > 0 ? appointments.map((app) => (
                  <tr key={app.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-10 py-8">
                      <div className="flex items-center space-x-5">
                         <div className="w-12 h-12 rounded-[1rem] bg-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all text-xs">
                            {(app.patient?.user?.name || "P").split(' ').map((n:any)=>n[0]).join('')}
                         </div>
                         <div>
                            <div className="font-black text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{app.patient?.user?.name || "Patient"}</div>
                            <div className="text-slate-400 text-xs font-bold uppercase tracking-tight">
                               {app.patient?.gender} • {new Date(app.date).toLocaleDateString()}
                            </div>
                         </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                       <p className="text-slate-600 font-bold max-w-xs">{app.reason}</p>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex flex-col">
                        <span className="text-slate-900 font-black">{new Date(app.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
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
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-10 py-20 text-center text-slate-400 font-bold">
                       No appointments scheduled yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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
