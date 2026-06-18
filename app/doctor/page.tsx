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
  FileText,
  Bell,
  Download,
  Video
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
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showNotifications, setShowNotifications] = useState(false);

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
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update appointment status");
      }

      const updated = await res.json();
      setAppointments(appointments.map(app =>
        app.id === id ? updated : app
      ));
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Unable to update appointment status. Please try again.");
    }
  };

  const exportAppointments = () => {
    const csv = [
      ["Patient", "Date", "Time", "Status", "Reason"],
      ...filteredAppointments.map(a => [
        a.patient?.user?.name || "Unknown",
        new Date(a.date).toLocaleDateString(),
        new Date(a.date).toLocaleTimeString(),
        a.status,
        a.reason || "N/A"
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `appointments-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const filteredAppointments = appointments.filter(app => {
    const matchesSearch = searchQuery === "" || 
      app.patient?.user?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const notifications = [
    { id: 1, type: "appointment", message: "New appointment request from John Doe", time: "5 min ago", unread: true },
    { id: 2, type: "report", message: "Patient health report submitted", time: "1 hour ago", unread: true },
    { id: 3, type: "system", message: "Lab results ready for review", time: "2 hours ago", unread: false },
  ];

  const clinicalStats = [
    { label: "Total Patients", value: "842", icon: Users, color: "text-blue-600", bg: "bg-blue-50", growth: "+12%" },
    { label: "Today's Schedule", value: filteredAppointments.length.toString(), icon: Clock, color: "text-amber-600", bg: "bg-amber-50", growth: "Active" },
    { label: "Satisfaction Rate", value: "98%", icon: UserCheck, color: "text-green-600", bg: "bg-green-50", growth: "Top 5%" },
  ];

  const demographicsData = [
    { age: "0-18", count: 120, color: "#3b82f6" },
    { age: "19-35", count: 280, color: "#10b981" },
    { age: "36-50", count: 240, color: "#f59e0b" },
    { age: "51-65", count: 150, color: "#ef4444" },
    { age: "65+", count: 52, color: "#8b5cf6" },
  ];

  const resources = [
    { name: "ICD-10 Codes", icon: FileText, color: "blue" },
    { name: "Medication DB", icon: Stethoscope, color: "green" },
    { name: "Guidelines", icon: Notebook, color: "amber" },
    { name: "Calculators", icon: TrendingUp, color: "purple" },
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

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:bg-slate-50 transition-colors"
            >
              <Bell className="w-6 h-6 text-slate-600" />
              <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-4 w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="text-xl font-black text-slate-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(notif => (
                    <div key={notif.id} className={`p-6 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${notif.unread ? 'bg-blue-50/30' : ''}`}>
                      <div className="flex items-start gap-4">
                        <div className={`w-2 h-2 rounded-full mt-2 ${notif.unread ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
                        <div className="flex-grow">
                          <p className="text-sm font-bold text-slate-900">{notif.message}</p>
                          <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 text-center border-t border-slate-100">
                  <button className="text-sm font-black text-blue-600 hover:underline">View All</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {clinicalStats.map((stat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center mb-6`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div className="space-y-1">
                <div className="text-slate-500 text-xs font-black uppercase tracking-widest">{stat.label}</div>
                <div className="flex items-baseline space-x-3">
                  <span className="text-4xl font-black text-slate-900 tracking-tight">{stat.value}</span>
                  <span className="text-sm font-bold text-green-600">{stat.growth}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          {/* Left Column */}
          <div className="xl:col-span-8 space-y-10">
            {/* Clinical Schedule */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Clinical Schedule</h2>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={exportAppointments}
                    className="px-4 py-2 bg-slate-50 rounded-xl text-sm font-black text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export List</span>
                  </button>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-grow relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search patients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
                  />
                </div>
                <div className="flex gap-2">
                  {["all", "pending", "approved", "completed"].map(status => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-4 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                        statusFilter === status
                          ? "bg-blue-600 text-white"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Appointments Table */}
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="px-8 py-6 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Patient</th>
                        <th className="px-8 py-6 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Date & Time</th>
                        <th className="px-8 py-6 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Reason</th>
                        <th className="px-8 py-6 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                        <th className="px-8 py-6 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredAppointments.length > 0 ? filteredAppointments.map((appointment) => (
                        <tr key={appointment.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-8 py-6">
                            <Link 
                              href={`/doctor/patient/${appointment.patientId}`}
                              className="font-black text-slate-900 hover:text-blue-600 transition-colors"
                            >
                              {appointment.patient?.user?.name || "Unknown Patient"}
                            </Link>
                          </td>
                          <td className="px-8 py-6">
                            <div className="text-sm font-bold text-slate-600">
                              {new Date(appointment.date).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-slate-400">
                              {new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className="text-sm font-bold text-slate-600">
                              {appointment.reason || "General Consultation"}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
                              appointment.status === "APPROVED" ? "bg-blue-50 text-blue-700" :
                              appointment.status === "COMPLETED" ? "bg-green-50 text-green-700" :
                              appointment.status === "CANCELLED" ? "bg-red-50 text-red-700" :
                              "bg-amber-50 text-amber-700"
                            }`}>
                              {appointment.status}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-2">
                              {appointment.status === "PENDING" && (
                                <>
                                  <button
                                    onClick={() => updateStatus(appointment.id, "APPROVED")}
                                    className="p-2 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
                                  >
                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                  </button>
                                  <button
                                    onClick={() => updateStatus(appointment.id, "CANCELLED")}
                                    className="p-2 bg-red-50 rounded-lg hover:bg-red-100 transition-colors group"
                                  >
                                    <XCircle className="w-4 h-4 text-red-600" />
                                  </button>
                                </>
                              )}
                              <Link
                                href={`/doctor/patient/${appointment.patientId}`}
                                className="p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                              >
                                <FileText className="w-4 h-4 text-blue-600" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={5} className="px-8 py-12 text-center">
                            <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <p className="text-slate-400 font-bold">No appointments found</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Recent Patient Reports */}
            <section>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">Recent Patient Reports</h2>
              <div className="space-y-4">
                {reports.slice(0, 5).map((report, i) => (
                  <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <span className="font-black text-slate-900">
                            {report.patient?.user?.name || "Patient"}
                          </span>
                          <span className="text-xs text-slate-400">
                            {new Date(report.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-slate-600 line-clamp-2">{report.content}</p>
                      </div>
                      <Link
                        href={`/doctor/patient/${report.patientId}`}
                        className="px-4 py-2 bg-blue-50 rounded-lg text-sm font-black text-blue-600 hover:bg-blue-100 transition-colors"
                      >
                        View EMR
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="xl:col-span-4 space-y-10">
            {/* Patient Demographics */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-8">
              <h3 className="text-xl font-black text-slate-900 mb-6">Patient Demographics</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={demographicsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="age" tick={{ fontSize: 12, fontWeight: 700 }} stroke="#94a3b8" />
                  <YAxis tick={{ fontSize: 12, fontWeight: 700 }} stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '12px', 
                      border: 'none', 
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                      fontWeight: 700
                    }} 
                  />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {demographicsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Clinical Resources */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-8">
              <h3 className="text-xl font-black text-slate-900 mb-6">Clinical Resources</h3>
              <div className="grid grid-cols-2 gap-4">
                {resources.map((resource, i) => (
                  <button
                    key={i}
                    className={`p-6 rounded-2xl bg-${resource.color}-50 hover:bg-${resource.color}-100 transition-all group`}
                  >
                    <resource.icon className={`w-8 h-8 text-${resource.color}-600 mb-3`} />
                    <div className="text-sm font-black text-slate-900">{resource.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Telemedicine */}
            <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <Video className="w-10 h-10 mb-6 opacity-80" />
                <h3 className="text-2xl font-black mb-2">Telemedicine</h3>
                <p className="text-blue-100 font-medium mb-8">Start a secure video consultation with your patients.</p>
                <button className="w-full bg-white text-blue-600 py-4 rounded-xl font-black hover:bg-slate-50 transition-all">
                  Start Video Sync
                </button>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
