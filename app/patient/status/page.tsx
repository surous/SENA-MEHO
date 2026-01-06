"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Heart, 
  Activity, 
  Droplets, 
  Scale, 
  ClipboardList, 
  ChevronLeft,
  Sparkle
} from "lucide-react";
import Link from "next/link";

export default function PatientStatus() {
  const [content, setContent] = useState("");
  const [vitals, setVitals] = useState({
    heartRate: "",
    bloodPressure: "",
    weight: "",
    sugar: ""
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/health-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, vitals }),
      });

      if (res.ok) {
        alert("Health report submitted successfully!");
        router.push("/patient");
      } else {
        alert("Failed to submit report");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
              <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase mb-4 border border-blue-500/30">
                <Sparkle className="w-3 h-3" />
                <span>Patient Reporting Portal</span>
              </div>
              <h1 className="text-4xl font-black tracking-tight">How are you feeling?</h1>
              <p className="text-slate-400 font-bold mt-2 text-lg">Your updates help our team provide better care.</p>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>
          </div>

          <form onSubmit={handleSubmit} className="p-12 space-y-12">
            <div className="space-y-10">
               {/* Vitals Grid */}
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span>Heart Rate (bpm)</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 72"
                      value={vitals.heartRate}
                      onChange={(e) => setVitals({...vitals, heartRate: e.target.value})}
                      className="w-full px-6 py-5 rounded-[1.5rem] border border-slate-100 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all bg-slate-50 font-bold text-slate-700"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-500" />
                      <span>Blood Pressure</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 120/80"
                      value={vitals.bloodPressure}
                      onChange={(e) => setVitals({...vitals, bloodPressure: e.target.value})}
                      className="w-full px-6 py-5 rounded-[1.5rem] border border-slate-100 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all bg-slate-50 font-bold text-slate-700"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Scale className="w-4 h-4 text-green-500" />
                      <span>Weight (kg)</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 70"
                      value={vitals.weight}
                      onChange={(e) => setVitals({...vitals, weight: e.target.value})}
                      className="w-full px-6 py-5 rounded-[1.5rem] border border-slate-100 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all bg-slate-50 font-bold text-slate-700"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-amber-500" />
                      <span>Blood Sugar</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 98"
                      value={vitals.sugar}
                      onChange={(e) => setVitals({...vitals, sugar: e.target.value})}
                      className="w-full px-6 py-5 rounded-[1.5rem] border border-slate-100 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all bg-slate-50 font-bold text-slate-700"
                    />
                  </div>
               </div>

               <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-blue-600" />
                    <span>How are you doing today?</span>
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={6}
                    className="w-full px-6 py-5 rounded-[1.5rem] border border-slate-100 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all resize-none bg-slate-50 font-bold text-slate-700"
                    placeholder="Describe any symptoms, concerns, or general updates about your recovery/well-being..."
                    required
                  />
               </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-black py-6 rounded-[1.5rem] shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all disabled:opacity-50 text-xl"
            >
              {loading ? "Transmitting Medical Data..." : "Submit Health Update"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
