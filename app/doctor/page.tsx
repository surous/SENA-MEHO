"use client";

import { useSession } from "next-auth/react";
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ChevronRight,
  Stethoscope,
  Notebook
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DoctorDashboard() {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState([
    { id: "1", patientName: "John Doe", time: "10:00 AM", status: "APPROVED", reason: "Regular heart checkup" },
    { id: "2", patientName: "Jane Smith", time: "11:30 AM", status: "PENDING", reason: "Flu symptoms" },
    { id: "3", patientName: "Michael Brown", time: "02:00 PM", status: "COMPLETED", reason: "Post-surgery follow-up" },
  ]);

  const updateStatus = (id: string, newStatus: string) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-slate-900">Welcome, {session?.user?.name || "Doctor"}</h1>
        <p className="text-slate-500 mt-1">Manage your daily schedule and patient records effectively.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center space-x-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
            <Users className="w-7 h-7 text-blue-600" />
          </div>
          <div>
            <div className="text-slate-500 text-sm font-medium">Total Patients</div>
            <div className="text-2xl font-bold text-slate-900">42</div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center space-x-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center">
            <Clock className="w-7 h-7 text-amber-600" />
          </div>
          <div>
            <div className="text-slate-500 text-sm font-medium">Today's Appointments</div>
            <div className="text-2xl font-bold text-slate-900">8</div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center space-x-6">
          <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7 text-green-600" />
          </div>
          <div>
            <div className="text-slate-500 text-sm font-medium">Completed Today</div>
            <div className="text-2xl font-bold text-slate-900">5</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Today's Schedule</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-8 py-4 font-bold">Patient</th>
                <th className="px-8 py-4 font-bold">Time</th>
                <th className="px-8 py-4 font-bold">Reason</th>
                <th className="px-8 py-4 font-bold">Status</th>
                <th className="px-8 py-4 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {appointments.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="font-bold text-slate-900">{app.patientName}</div>
                  </td>
                  <td className="px-8 py-6 text-slate-600 font-medium">{app.time}</td>
                  <td className="px-8 py-6 text-slate-500">{app.reason}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      app.status === 'APPROVED' ? 'bg-blue-50 text-blue-700' :
                      app.status === 'PENDING' ? 'bg-amber-50 text-amber-700' :
                      app.status === 'COMPLETED' ? 'bg-green-50 text-green-700' :
                      'bg-red-50 text-red-700'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-3">
                      <button 
                         title="Approve"
                         onClick={() => updateStatus(app.id, "APPROVED")}
                         className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button 
                        title="Cancel"
                        onClick={() => updateStatus(app.id, "CANCELLED")}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                      <Link 
                        href={`/doctor/patient/${app.id}`}
                        title="Add Notes"
                        className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                      >
                        <Notebook className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
