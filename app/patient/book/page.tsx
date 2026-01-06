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
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/patient" className="inline-flex items-center space-x-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors">
        <ChevronLeft className="w-5 h-5" />
        <span className="font-semibold">Back to Dashboard</span>
      </Link>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-8 text-white">
          <h1 className="text-3xl font-bold">Book Appointment</h1>
          <p className="opacity-90 mt-1">Schedule a consultation with our specialists</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="space-y-6">
             <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center space-x-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>Select Specialist</span>
                </label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full px-4 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none bg-slate-50 font-medium"
                  required
                >
                  <option value="">Choose a doctor</option>
                  {doctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.user.name} ({doc.department.name})
                    </option>
                  ))}
                </select>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>Preferred Date</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-slate-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>Time Slot</span>
                  </label>
                  <select
                    className="w-full px-4 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none bg-slate-50"
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
                <label className="block text-sm font-bold text-slate-700 mb-3">Reason for Visit</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none bg-slate-50"
                  placeholder="Briefly describe your symptoms or reason for the appointment"
                  required
                />
             </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {loading ? "Processing..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}
