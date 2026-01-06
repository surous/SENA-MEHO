"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, User, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Doctor {
  id: string;
  user: { name: string };
  department: { name: string };
  specialty: string;
}

export default function BookAppointment() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Mock fetching doctors (in a real app, this would be an API call)
  useEffect(() => {
    // Simulated data
    setDoctors([
      { id: "sena-doc", user: { name: "Dr. Sena" }, department: { name: "Cardiology" }, specialty: "Founder & Chief Medical Officer" },
      { id: "doc1", user: { name: "Dr. Sarah Wilson" }, department: { name: "Cardiology" }, specialty: "Senior Cardiologist" },
      { id: "doc2", user: { name: "Dr. James Miller" }, department: { name: "Emergency" }, specialty: "Emergency Physician" },
    ]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulated booking (in a real app, this would be an API call to create appointment)
    setTimeout(() => {
      alert("Appointment booked successfully (Mock Flow)!");
      router.push("/patient");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/patient" className="inline-flex items-center space-x-2 text-slate-400 hover:text-blue-600 mb-10 transition-colors group">
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </div>
          <span className="font-black uppercase tracking-widest text-xs">Back to Command Center</span>
        </Link>

        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
          <div className="bg-slate-900 p-12 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-4xl font-black tracking-tight">Schedule Consultation</h1>
              <p className="text-blue-400 font-bold mt-2">Book a session with our board-certified specialists</p>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>
          </div>

          <form onSubmit={handleSubmit} className="p-12 space-y-10">
            <div className="space-y-8">
               <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    <span>Select Specialist</span>
                  </label>
                  <select
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="w-full px-6 py-5 rounded-[1.5rem] border border-slate-100 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all appearance-none bg-slate-50 font-bold text-slate-700"
                    required
                  >
                    <option value="">Choose a doctor</option>
                    {doctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.user.name} — {doc.specialty}
                      </option>
                    ))}
                  </select>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span>Preferred Date</span>
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-6 py-5 rounded-[1.5rem] border border-slate-100 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all bg-slate-50 font-bold text-slate-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>Time Slot</span>
                    </label>
                    <select
                      className="w-full px-6 py-5 rounded-[1.5rem] border border-slate-100 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all appearance-none bg-slate-50 font-bold text-slate-700"
                      required
                    >
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                    </select>
                  </div>
               </div>

               <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Reason for Visit</label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={4}
                    className="w-full px-6 py-5 rounded-[1.5rem] border border-slate-100 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all resize-none bg-slate-50 font-bold text-slate-700"
                    placeholder="Briefly describe your symptoms or reason for the appointment"
                    required
                  />
               </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-black py-6 rounded-[1.5rem] shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all disabled:opacity-50"
            >
              {loading ? "Processing Clinical Request..." : "Confirm Medical Booking"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
