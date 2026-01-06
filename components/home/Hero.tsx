"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Hero() {
  const { data: session } = useSession();

  return (
    <section className="bg-white pt-16 pb-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block bg-slate-100 text-slate-900 px-4 py-1.5 rounded-md text-sm font-bold border border-slate-300">
              TRUSTED HEALTHCARE
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
              Sena Medical Hospital: Quality Care for Everyone.
            </h1>
            <p className="text-xl text-slate-700 leading-relaxed max-w-xl">
              Specialized medical services with expert doctors and advanced technology. 
              We prioritize patient safety and accessibility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={session ? "/patient" : "/register"}
                className="bg-blue-700 text-white px-10 py-5 rounded-lg font-black text-lg hover:bg-blue-800 transition-all text-center shadow-md"
              >
                Book Appointment
              </Link>
              <Link
                href="#services"
                className="bg-white text-slate-900 border-2 border-slate-900 px-10 py-5 rounded-lg font-black text-lg hover:bg-slate-100 transition-all text-center"
              >
                Our Services
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="rounded-2xl border-4 border-slate-100 overflow-hidden shadow-lg bg-slate-50">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
                alt="Clean medical facility interior"
                className="w-full h-[450px] object-cover grayscale-[0.2]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
