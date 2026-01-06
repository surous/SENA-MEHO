"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function Hero() {
  const { data: session } = useSession();

  return (
    <section className="bg-white min-h-[90vh] flex items-center pt-32 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10 text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-5 py-2 rounded-full text-sm font-black tracking-wider uppercase mb-8 border border-blue-100 animate-in fade-in slide-in-from-left duration-700">
              <Sparkles className="w-4 h-4" />
              <span>Future of Medical Care</span>
            </div>
            
            <h1 className="text-7xl lg:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-8 animate-in fade-in slide-in-from-left duration-700 delay-100">
                Quality Care <br />
                <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">For Everyone.</span>
            </h1>
            
            <p className="text-2xl text-slate-500 font-bold leading-relaxed max-w-xl mb-12 animate-in fade-in slide-in-from-left duration-700 delay-200">
              Sena Medical Hospital combines world-class expertise with cutting-edge technology to deliver personalized healthcare that puts you first.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 animate-in fade-in slide-in-from-left duration-700 delay-300">
              <Link
                href={session ? "/patient" : "/register"}
                className="bg-slate-900 text-white px-10 py-6 rounded-[2rem] font-black text-2xl hover:bg-blue-600 transition-all text-center flex items-center justify-center gap-3 shadow-2xl shadow-slate-200 hover:shadow-blue-200"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-8 h-8" />
              </Link>
              <Link
                href="#services"
                className="bg-white text-slate-900 border-4 border-slate-900 px-10 py-6 rounded-[2rem] font-black text-2xl hover:bg-slate-50 transition-all text-center"
              >
                Our Services
              </Link>
            </div>

            <div className="mt-16 flex items-center gap-8 grayscale opacity-50 font-black text-slate-400">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6" />
                    <span>ISO Certified</span>
                </div>
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6" />
                    <span>24/7 Available</span>
                </div>
            </div>
          </div>

          <div className="relative animate-in zoom-in duration-1000">
            <div className="relative z-10 aspect-square rounded-[3rem] overflow-hidden border-8 border-slate-50 shadow-2xl skew-y-1">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200"
                alt="Modern Hospital Architecture"
                className="w-full h-full object-cover scale-110"
              />
            </div>
            {/* Background elements for modern look */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100 rounded-full blur-[100px] -z-10" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-50 rounded-full blur-[100px] -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
