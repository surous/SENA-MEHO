"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Lock, AlertCircle } from "lucide-react";

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
        setError("Invalid email or password. Please try again.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="max-w-md w-full border-4 border-slate-900 rounded-lg p-10 bg-white shadow-[12px_12px_0px_0px_rgba(15,23,42,1)]">
        <div className="text-left mb-10">
          <h1 className="text-4xl font-black text-slate-900 mb-2">Login</h1>
          <p className="text-lg text-slate-700 font-bold">Access your Sena Medical account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border-2 border-red-600 text-red-700 p-4 rounded-lg flex items-center space-x-3">
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <span className="font-bold text-lg">{error}</span>
            </div>
          )}
          
          <div>
            <label className="block text-xl font-black text-slate-900 mb-3 flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-lg border-4 border-slate-200 focus:border-blue-600 outline-none transition-all text-xl font-bold bg-slate-50"
              placeholder="e.g. name@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-xl font-black text-slate-900 mb-3 flex items-center space-x-2">
              <Lock className="w-5 h-5" />
              <span>Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-lg border-4 border-slate-200 focus:border-blue-600 outline-none transition-all text-xl font-bold bg-slate-50"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white font-black py-5 rounded-lg text-2xl hover:bg-blue-800 transition-all disabled:opacity-50 border-b-4 border-blue-900 active:translate-y-1 active:border-b-0"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-10 pt-10 border-t-2 border-slate-200 text-center">
          <p className="text-lg text-slate-900 font-bold">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-blue-700 font-black hover:underline"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
