"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, User, LogOut, ChevronRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Services", href: "/#services" },
    { name: "Doctors", href: "/#doctors" },
    { name: "Contact", href: "/#contact" },
  ];

  const getDashboardLink = () => {
    if (!session) return null;
    switch (session.user.role) {
      case "ADMIN": return "/admin";
      case "DOCTOR": return "/doctor";
      case "PATIENT": return "/patient";
      default: return "/";
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-4 group">
              <div className="relative w-16 h-16">
                 <Image 
                   src="/logo.jpg" 
                   alt="Sena Medical Hospital Logo" 
                   fill
                   className="object-contain"
                 />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-slate-900 tracking-tight leading-none">
                  SENA MEDICAL
                </span>
                <span className="text-[10px] font-bold text-blue-600 tracking-widest uppercase mt-1">
                  Hospital
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-slate-900 font-bold hover:text-blue-600 transition-colors py-2"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="h-6 w-px bg-slate-200 mx-4" />

            {session ? (
              <div className="flex items-center space-x-6">
                <Link
                  href={getDashboardLink() || "/"}
                  className="text-slate-900 font-black flex items-center space-x-2 hover:bg-slate-50 px-4 py-2 rounded-xl transition-all"
                >
                  <User className="w-5 h-5 text-blue-600" />
                  <span>Portal</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-6 h-6" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-slate-900 font-black px-6 py-3 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-black shadow-lg shadow-slate-200 hover:bg-blue-600 hover:shadow-blue-200 transition-all flex items-center space-x-2"
                >
                  <span>Register</span>
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-900 p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-4 pb-8 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-6 py-4 text-slate-900 font-black text-xl hover:bg-slate-50 rounded-2xl"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col gap-4">
              {!session ? (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-6 py-5 text-slate-900 text-center font-black text-xl border-2 border-slate-900 rounded-2xl"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="block px-6 py-5 bg-slate-900 text-white text-center font-black text-xl rounded-2xl"
                  >
                    Register Now
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href={getDashboardLink() || "/"}
                    onClick={() => setIsOpen(false)}
                    className="block px-6 py-5 text-slate-900 font-black text-xl bg-slate-50 rounded-2xl"
                  >
                    Go to Portal
                  </Link>
                  <button
                    onClick={() => {
                        setIsOpen(false);
                        signOut();
                    }}
                    className="block w-full px-6 py-5 text-red-600 font-black text-xl text-left bg-red-50 rounded-2xl"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
