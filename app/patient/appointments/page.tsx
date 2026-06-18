"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { 
  Calendar, 
  Clock, 
  ChevronLeft,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  MapPin,
  User
} from "lucide-react";
import Link from "next/link";

export default function AppointmentsPage() {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const res = await fetch("/api/appointments");
        const data = await res.json();
        if (Array.isArray(data)) setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, []);

  const filteredAppointments = filter === "all" 
    ? appointments 
    : appointments.filter(a => a.status.toLowerCase() === filter.toLowerCase());

  const cancelAppointment = async (id: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CANCELLED" }),
      });

      if (!res.ok) {
        throw new Error("Failed to cancel appointment");
      }

      const updated = await res.json();
      setAppointments(appointments.map((appointment) =>
        appointment.id === id ? updated : appointment
      ));
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      alert("Unable to cancel appointment. Please try again.");
    }
  };

  const statusColors = {
    PENDING: "bg-amber-50 text-amber-700 border-amber-100",
    APPROVED: "bg-blue-50 text-blue-700 border-blue-100",
    COMPLETED: "bg-green-50 text-green-700 border-green-100",
    CANCELLED: "bg-red-50 text-red-700 border-red-100"
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <Link href="/patient" className="inline-flex items-center space-x-2 text-slate-400 hover:text-blue-600 mb-10 transition-colors group">
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </div>
          <span className="font-black uppercase tracking-widest text-xs">Back to Dashboard</span>
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">My Appointments</h1>
          <p className="text-lg text-slate-500 font-bold">View and manage all your scheduled consultations</p>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {["all", "pending", "approved", "completed", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
                filter === status
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Appointments List */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-slate-400 font-bold">Loading appointments...</p>
            </div>
          ) : filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-grow space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center">
                        <User className="w-7 h-7 text-slate-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900">
                          {appointment.doctor?.user?.name || "Doctor"}
                        </h3>
                        <p className="text-sm font-bold text-slate-500">
                          {appointment.doctor?.specialty || "Specialist"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <span className="font-bold text-slate-700">
                          {new Date(appointment.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span className="font-bold text-slate-700">
                          {new Date(appointment.date).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>

                    {appointment.reason && (
                      <div className="bg-slate-50 rounded-xl p-4">
                        <p className="text-sm font-bold text-slate-600">
                          <span className="text-slate-400 uppercase tracking-wider text-xs">Reason: </span>
                          {appointment.reason}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-4">
                    <span className={`inline-flex px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border ${
                      statusColors[appointment.status as keyof typeof statusColors] || statusColors.PENDING
                    }`}>
                      {appointment.status}
                    </span>
                    
                    {appointment.status === "PENDING" && (
                      <button
                        onClick={() => cancelAppointment(appointment.id)}
                        className="text-sm font-black text-red-500 hover:text-red-600 transition-colors"
                      >
                        Cancel Appointment
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-[2rem]">
              <AlertCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-black text-slate-400 mb-2">No Appointments Found</h3>
              <p className="text-slate-400 font-bold mb-6">
                {filter === "all" 
                  ? "You haven't booked any appointments yet."
                  : `No ${filter} appointments found.`}
              </p>
              <Link
                href="/patient/book"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-black hover:bg-blue-700 transition-all shadow-lg"
              >
                <Calendar className="w-5 h-5" />
                <span>Book New Appointment</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
