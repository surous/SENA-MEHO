"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, AlertCircle, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        router.push("/login?registered=true");
      } else {
        const data = await res.json();
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("System temporary unavailable. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-32">
      <div className="max-w-[520px] w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">Create account</h1>
          <p className="text-xl text-slate-500 font-bold">Join Sena Medical Hospital today</p>
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-[2.5rem] p-12 shadow-2xl shadow-slate-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-600 p-5 rounded-2xl flex items-center gap-4">
                <AlertCircle className="w-6 h-6 flex-shrink-0" />
                <span className="font-bold text-lg leading-tight">{error}</span>
              </div>
            )}
            
            <div className="space-y-4">
              <label htmlFor="name" className="block text-sm font-black text-slate-500 uppercase tracking-widest px-1">
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-5 top-5 w-6 h-6 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-16 pr-6 py-5 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-900 text-xl font-bold focus:border-blue-600 focus:bg-white outline-none transition-all placeholder:text-slate-300"
                  placeholder="Your Name"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <label htmlFor="email" className="block text-sm font-black text-slate-500 uppercase tracking-widest px-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-5 top-5 w-6 h-6 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-16 pr-6 py-5 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-900 text-xl font-bold focus:border-blue-600 focus:bg-white outline-none transition-all placeholder:text-slate-300"
                  placeholder="name@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <label htmlFor="password" className="block text-sm font-black text-slate-500 uppercase tracking-widest px-1">
                Secret Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-5 top-5 w-6 h-6 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-16 pr-6 py-5 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-900 text-xl font-bold focus:border-blue-600 focus:bg-white outline-none transition-all placeholder:text-slate-300"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white font-black py-6 rounded-2xl text-2xl hover:bg-blue-600 transition-all disabled:opacity-50 flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {loading ? "Creating..." : (
                <>
                    <span>Register Now</span>
                    <ArrowRight className="w-7 h-7" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-100 text-center">
            <p className="text-lg text-slate-500 font-bold">
              Already have an account? {" "}
              <Link
                href="/login"
                className="text-blue-600 font-black hover:underline underline-offset-8"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
