"use client";

import { useSession } from "next-auth/react";
import { 
  Calendar, 
  Clock, 
  FileText, 
  PlusCircle, 
  ChevronRight,
  ClipboardList
} from "lucide-react";
import Link from "next/link";

export default function PatientDashboard() {
  const { data: session } = useSession();

  const stats = [
    { label: "Upcoming Appointments", value: "1", icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Medical Records", value: "12", icon: FileText, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Prescriptions", value: "3", icon: ClipboardList, color: "text-green-600", bg: "bg-green-50" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Hello, {session?.user?.name || "Patient"}</h1>
          <p className="text-slate-500 mt-1">Welcome to your health dashboard. Manage your records and appointments here.</p>
        </div>
        <Link 
          href="/patient/book"
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Book New Appointment</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center space-x-6">
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center`}>
              <stat.icon className={`w-7 h-7 ${stat.color}`} />
            </div>
            <div>
              <div className="text-slate-500 text-sm font-medium">{stat.label}</div>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Recent Appointments */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Upcoming Appointment</h2>
            <Link href="/patient/appointments" className="text-blue-600 font-semibold text-sm hover:underline">View All</Link>
          </div>
          
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1559839734-2b71f153678f?auto=format&fit=crop&q=80&w=200" alt="Doctor Sarah Wilson" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-900">Dr. Sarah Wilson</div>
                  <div className="text-slate-500 text-sm">Senior Cardiologist</div>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2 text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Tomorrow, Jan 7</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">10:00 AM - 10:30 AM</span>
                </div>
              </div>

              <div className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold">
                Approved
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions / Recent Records */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Medical Notifications</h2>
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6 space-y-4">
             <div className="p-4 bg-slate-50 rounded-2xl border-l-4 border-blue-500">
                <div className="font-bold text-slate-900 text-sm">Appointment Reminder</div>
                <p className="text-slate-500 text-xs mt-1">Your appointment with Dr. Sarah Wilson is tomorrow.</p>
             </div>
             <div className="p-4 bg-slate-50 rounded-2xl border-l-4 border-green-500">
                <div className="font-bold text-slate-900 text-sm">New Prescription</div>
                <p className="text-slate-500 text-xs mt-1">Dr. Miller added a new prescription to your records.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
