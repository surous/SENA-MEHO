"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { 
  ChevronLeft,
  FileText,
  Heart,
  Activity,
  Droplets,
  Scale,
  TrendingUp,
  Calendar
} from "lucide-react";
import Link from "next/link";

export default function ReportsHistoryPage() {
  const { data: session } = useSession();
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch("/api/health-reports");
        const data = await res.json();
        if (Array.isArray(data)) setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  const parseVitals = (vitalsString: string) => {
    try {
      return JSON.parse(vitalsString);
    } catch {
      return {};
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link href="/patient" className="inline-flex items-center space-x-2 text-slate-400 hover:text-blue-600 mb-10 transition-colors group">
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </div>
          <span className="font-black uppercase tracking-widest text-xs">Back to Dashboard</span>
        </Link>

        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Health Reports</h1>
            <p className="text-lg text-slate-500 font-bold">Timeline of your submitted health updates</p>
          </div>
          <Link
            href="/patient/status"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-black hover:bg-blue-700 transition-all shadow-lg"
          >
            <FileText className="w-5 h-5" />
            <span>New Report</span>
          </Link>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200"></div>

          <div className="space-y-8">
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-slate-400 font-bold">Loading reports...</p>
              </div>
            ) : reports.length > 0 ? (
              reports.map((report, index) => {
                const vitals = parseVitals(report.vitals || "{}");
                return (
                  <div key={report.id} className="relative pl-20">
                    {/* Timeline Dot */}
                    <div className="absolute left-6 top-6 w-5 h-5 rounded-full bg-blue-600 border-4 border-white shadow-lg"></div>

                    <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-lg hover:shadow-xl transition-all">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          <span className="font-black text-slate-900">
                            {new Date(report.createdAt).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-slate-400">
                          {new Date(report.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>

                      {/* Vitals Grid */}
                      {Object.keys(vitals).length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          {vitals.heartRate && (
                            <div className="bg-red-50 rounded-xl p-4">
                              <Heart className="w-5 h-5 text-red-500 mb-2" />
                              <div className="text-2xl font-black text-slate-900">{vitals.heartRate}</div>
                              <div className="text-xs font-black text-slate-400 uppercase tracking-widest">bpm</div>
                            </div>
                          )}
                          {vitals.bloodPressure && (
                            <div className="bg-blue-50 rounded-xl p-4">
                              <Activity className="w-5 h-5 text-blue-500 mb-2" />
                              <div className="text-2xl font-black text-slate-900">{vitals.bloodPressure}</div>
                              <div className="text-xs font-black text-slate-400 uppercase tracking-widest">BP</div>
                            </div>
                          )}
                          {vitals.weight && (
                            <div className="bg-green-50 rounded-xl p-4">
                              <Scale className="w-5 h-5 text-green-500 mb-2" />
                              <div className="text-2xl font-black text-slate-900">{vitals.weight}</div>
                              <div className="text-xs font-black text-slate-400 uppercase tracking-widest">kg</div>
                            </div>
                          )}
                          {vitals.sugar && (
                            <div className="bg-amber-50 rounded-xl p-4">
                              <Droplets className="w-5 h-5 text-amber-500 mb-2" />
                              <div className="text-2xl font-black text-slate-900">{vitals.sugar}</div>
                              <div className="text-xs font-black text-slate-400 uppercase tracking-widest">mg/dL</div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Content */}
                      <div className="bg-slate-50 rounded-xl p-6">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Status Update</h3>
                        <p className="text-slate-900 font-bold leading-relaxed">{report.content}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-[2rem]">
                <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-black text-slate-400 mb-2">No Reports Yet</h3>
                <p className="text-slate-400 font-bold mb-6">Start tracking your health by submitting your first report.</p>
                <Link
                  href="/patient/status"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-black hover:bg-blue-700 transition-all shadow-lg"
                >
                  <FileText className="w-5 h-5" />
                  <span>Submit First Report</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
