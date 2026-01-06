"use client";

import { X, Target, TrendingUp, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

interface WellnessGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: { name: string; target: number; unit: string; deadline: string; category: string }) => void;
}

export default function WellnessGoalModal({ isOpen, onClose, onSave }: WellnessGoalModalProps) {
  const [goalName, setGoalName] = useState("");
  const [target, setTarget] = useState("");
  const [unit, setUnit] = useState("");
  const [deadline, setDeadline] = useState("");
  const [category, setCategory] = useState("fitness");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: goalName,
      target: parseFloat(target),
      unit,
      deadline,
      category
    });
    // Reset form
    setGoalName("");
    setTarget("");
    setUnit("");
    setDeadline("");
    setCategory("fitness");
    onClose();
  };

  const categories = [
    { value: "fitness", label: "Fitness & Exercise", color: "green" },
    { value: "nutrition", label: "Nutrition & Diet", color: "amber" },
    { value: "sleep", label: "Sleep & Rest", color: "purple" },
    { value: "hydration", label: "Hydration", color: "blue" },
    { value: "mental", label: "Mental Health", color: "pink" },
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
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-white relative overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-8 h-8" />
              <h2 className="text-3xl font-black tracking-tight">Set Wellness Goal</h2>
            </div>
            <p className="text-blue-100 font-bold">Create a personalized health target</p>
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Category Selection */}
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
              Goal Category
            </label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`p-4 rounded-xl border-2 font-bold text-sm transition-all ${
                    category === cat.value
                      ? `border-${cat.color}-500 bg-${cat.color}-50 text-${cat.color}-700`
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Goal Name */}
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
              Goal Description
            </label>
            <input
              type="text"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              placeholder="e.g., Run 5km daily"
              className="w-full px-6 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-900"
              required
            />
          </div>

          {/* Target & Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                Target Value
              </label>
              <input
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="e.g., 5"
                className="w-full px-6 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-900"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                Unit
              </label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="e.g., km, hours, liters"
                className="w-full px-6 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-900"
                required
              />
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Target Deadline</span>
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-6 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-900"
              required
            />
          </div>
        </form>

        {/* Actions - Fixed at bottom */}
        <div className="p-8 pt-0">
          <div className="flex gap-4">
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              <span>Create Goal</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-4 border-2 border-slate-200 rounded-xl font-black text-slate-600 hover:border-slate-300 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
