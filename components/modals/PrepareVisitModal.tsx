"use client";

import { X, CheckCircle, FileText, CreditCard, Clock } from "lucide-react";
import { useState, useEffect } from "react";

interface PrepareVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: {
    doctor: { user: { name: string }; specialty: string } | string;
    date: string;
    time?: string;
  };
}

export default function PrepareVisitModal({ isOpen, onClose, appointment }: PrepareVisitModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const doctorName = typeof appointment.doctor === 'string' 
    ? appointment.doctor 
    : appointment.doctor.user.name;
  
  const specialty = typeof appointment.doctor === 'string'
    ? 'Specialist'
    : appointment.doctor.specialty;

  const checklist = [
    { id: 1, item: "Insurance card and photo ID", checked: false },
    { id: 2, item: "List of current medications", checked: false },
    { id: 3, item: "Recent lab results or imaging", checked: false },
    { id: 4, item: "List of questions for the doctor", checked: false },
    { id: 5, item: "Arrive 15 minutes early", checked: false },
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[2.5rem] max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative z-10">
            <h2 className="text-3xl font-black tracking-tight mb-2">Prepare for Your Visit</h2>
            <p className="text-blue-400 font-bold">{doctorName} • {specialty}</p>
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto">
          {/* Appointment Details */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <h3 className="font-black text-slate-900">Appointment Details</h3>
            </div>
            <p className="text-sm font-bold text-slate-600">
              {new Date(appointment.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
              {appointment.time && ` at ${appointment.time}`}
            </p>
          </div>

          {/* Pre-Visit Checklist */}
          <div>
            <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Pre-Visit Checklist</span>
            </h3>
            <div className="space-y-3">
              {checklist.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-2 border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
                    {item.item}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-5 h-5 text-amber-600" />
              <h3 className="font-black text-slate-900">Important Notes</h3>
            </div>
            <ul className="space-y-2 text-sm font-bold text-slate-600">
              <li>• Please arrive 15 minutes before your scheduled time</li>
              <li>• Bring your insurance card and a valid photo ID</li>
              <li>• If you need to cancel, please do so 24 hours in advance</li>
            </ul>
          </div>
        </div>

        {/* Actions - Fixed at bottom */}
        <div className="p-8 pt-0">
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-blue-600 transition-all shadow-lg"
            >
              I'm Ready
            </button>
            <button
              onClick={onClose}
              className="px-6 py-4 border-2 border-slate-200 rounded-2xl font-black text-slate-600 hover:border-slate-300 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
