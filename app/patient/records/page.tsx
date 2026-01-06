"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { 
  ChevronLeft,
  FileText,
  Download,
  Eye,
  Calendar,
  Activity,
  Pill,
  Image as ImageIcon
} from "lucide-react";
import Link from "next/link";

export default function MedicalRecordsPage() {
  const { data: session } = useSession();
  
  const records = [
    {
      id: 1,
      type: "Lab Results",
      title: "Complete Blood Count (CBC)",
      date: "2026-01-03",
      doctor: "Dr. Sarah Wilson",
      status: "Normal",
      icon: Activity,
      color: "blue"
    },
    {
      id: 2,
      type: "Prescription",
      title: "Medication Refill - Lisinopril 10mg",
      date: "2026-01-02",
      doctor: "Dr. Sarah Wilson",
      status: "Active",
      icon: Pill,
      color: "green"
    },
    {
      id: 3,
      type: "Imaging",
      title: "Chest X-Ray",
      date: "2025-12-28",
      doctor: "Dr. James Miller",
      status: "Clear",
      icon: ImageIcon,
      color: "purple"
    },
    {
      id: 4,
      type: "Lab Results",
      title: "Lipid Panel",
      date: "2025-12-15",
      doctor: "Dr. Sarah Wilson",
      status: "Borderline",
      icon: Activity,
      color: "amber"
    },
  ];

  const categories = [
    { name: "All Records", count: records.length },
    { name: "Lab Results", count: 2 },
    { name: "Prescriptions", count: 1 },
    { name: "Imaging", count: 1 },
  ];

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
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Medical Records</h1>
          <p className="text-lg text-slate-500 font-bold">Access your complete medical history and documents</p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-white border border-slate-100 rounded-2xl p-6 hover:border-blue-200 transition-all cursor-pointer group"
            >
              <div className="text-3xl font-black text-slate-900 mb-1">{category.count}</div>
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest">{category.name}</div>
            </div>
          ))}
        </div>

        {/* Active Prescriptions */}
        <div className="mb-8">
          <h2 className="text-2xl font-black text-slate-900 mb-6">Active Prescriptions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <Pill className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900">Lisinopril</h3>
                    <p className="text-sm font-bold text-slate-500">10mg daily</p>
                  </div>
                </div>
                <span className="text-xs font-black px-3 py-1 rounded-full bg-green-100 text-green-700">ACTIVE</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-500">Prescribed by:</span>
                  <span className="font-black text-slate-900">Dr. Sarah Wilson</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-500">Duration:</span>
                  <span className="font-black text-slate-900">30 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-500">Refills:</span>
                  <span className="font-black text-slate-900">2 remaining</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Pill className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900">Metformin</h3>
                    <p className="text-sm font-bold text-slate-500">500mg twice daily</p>
                  </div>
                </div>
                <span className="text-xs font-black px-3 py-1 rounded-full bg-blue-100 text-blue-700">ACTIVE</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-500">Prescribed by:</span>
                  <span className="font-black text-slate-900">Dr. Sarah Wilson</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-500">Duration:</span>
                  <span className="font-black text-slate-900">90 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-500">Refills:</span>
                  <span className="font-black text-slate-900">3 remaining</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Records List */}
        <div className="space-y-4">
          {records.map((record) => (
            <div
              key={record.id}
              className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-lg hover:shadow-xl transition-all group"
            >
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-6 flex-grow">
                  <div className={`w-16 h-16 rounded-2xl bg-${record.color}-50 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <record.icon className={`w-8 h-8 text-${record.color}-600`} />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-${record.color}-50 text-${record.color}-700`}>
                        {record.type}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        {new Date(record.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-1">{record.title}</h3>
                    <p className="text-sm font-bold text-slate-500">Ordered by {record.doctor}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest ${
                    record.status === "Normal" || record.status === "Clear" || record.status === "Active"
                      ? "bg-green-50 text-green-700"
                      : "bg-amber-50 text-amber-700"
                  }`}>
                    {record.status}
                  </span>
                  
                  <button className="p-3 bg-slate-50 rounded-xl hover:bg-blue-50 transition-colors group/btn">
                    <Eye className="w-5 h-5 text-slate-400 group-hover/btn:text-blue-600" />
                  </button>
                  
                  <button className="p-3 bg-slate-50 rounded-xl hover:bg-blue-50 transition-colors group/btn">
                    <Download className="w-5 h-5 text-slate-400 group-hover/btn:text-blue-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Download All */}
        <div className="mt-8 flex justify-center">
          <button className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-xl font-black hover:bg-blue-600 transition-all shadow-lg">
            <Download className="w-5 h-5" />
            <span>Download All Records</span>
          </button>
        </div>
      </div>
    </div>
  );
}
