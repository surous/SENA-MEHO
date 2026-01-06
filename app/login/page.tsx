"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Lock, AlertCircle, ArrowRight } from "lucide-react";

export default function LoginPage() {
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
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid credentials. Please check your email and password.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("System temporary unavailable. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-20">
      <div className="max-w-[480px] w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Welcome back</h1>
          <p className="text-lg text-slate-500 font-bold">Secure login for Sena Medical Hospital</p>
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
              <label htmlFor="email" className="block text-sm font-black text-slate-500 uppercase tracking-widest px-1">
                Email Address
              </label>
              <div className="relative group">
                <User className="absolute left-5 top-5 w-6 h-6 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
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
                Password
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
              {loading ? "Verifying..." : (
                <>
                    <span>Login</span>
                    <ArrowRight className="w-7 h-7" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-100 text-center">
            <p className="text-lg text-slate-500 font-bold">
              New to Sena Medical? {" "}
              <Link
                href="/register"
                className="text-blue-600 font-black hover:underline underline-offset-8"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
