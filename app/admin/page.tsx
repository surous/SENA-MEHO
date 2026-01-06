"use client";

import { useSession } from "next-auth/react";
import { 
  Users, 
  Building2, 
  CalendarCheck, 
  TrendingUp,
  BarChart3,
  Search,
  MoreVertical
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

const data = [
  { name: 'Mon', patients: 20 },
  { name: 'Tue', patients: 35 },
  { name: 'Wed', patients: 25 },
  { name: 'Thu', patients: 45 },
  { name: 'Fri', patients: 30 },
  { name: 'Sat', patients: 15 },
  { name: 'Sun', patients: 10 },
];

export default function AdminDashboard() {
  const { data: session } = useSession();

  const stats = [
    { label: "Total Users", value: "1,280", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Departments", value: "12", icon: Building2, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Total Bookings", value: "4,500+", icon: CalendarCheck, color: "text-green-600", bg: "bg-green-50" },
    { label: "Revenue (Mock)", value: "$125k", icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Console</h1>
          <p className="text-slate-500 mt-1">Real-time overview of hospital operations and performance.</p>
        </div>
        <div className="relative">
           <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
           <input 
             type="text" 
             placeholder="Search anything..." 
             className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm w-full md:w-64"
           />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-4`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-slate-500 text-sm font-medium">{stat.label}</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900">Patient Traffic</h2>
            <BarChart3 className="w-5 h-5 text-slate-400" />
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="patients" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900">Appointment Trends</h2>
            <TrendingUp className="w-5 h-5 text-slate-400" />
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="patients" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorPatients)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Recent Activity</h2>
          <button className="text-blue-600 font-semibold text-sm hover:underline">View Log</button>
        </div>
        <div className="divide-y divide-slate-50">
          {[
            { user: "Sarah Wilson", action: "Updated patient record", time: "2 mins ago" },
            { user: "Admin", action: "Created new department: Oncology", time: "1 hour ago" },
            { user: "John Doe", action: "Booked an appointment", time: "3 hours ago" },
          ].map((activity, i) => (
            <div key={i} className="px-8 py-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                  {activity.user[0]}
                </div>
                <div>
                  <div className="text-slate-900 font-bold">{activity.user}</div>
                  <div className="text-slate-500 text-sm">{activity.action}</div>
                </div>
              </div>
              <div className="text-slate-400 text-sm font-medium">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
