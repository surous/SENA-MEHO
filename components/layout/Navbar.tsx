"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, User, LogOut } from "lucide-react";
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
    <nav className="fixed w-full z-50 bg-white border-b-4 border-slate-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image 
                src="/logo.jpg" 
                alt="Sena Medical Hospital Logo" 
                width={150} 
                height={50} 
                className="h-12 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-slate-900 border-b-2 border-transparent hover:border-blue-700 font-black text-lg transition-all"
              >
                {link.name}
              </Link>
            ))}
            {session ? (
              <div className="flex items-center space-x-4">
                <Link
                  href={getDashboardLink() || "/"}
                  className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl font-medium hover:bg-slate-200 transition-all flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-slate-500 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
            >
              {link.name}
            </Link>
          ))}
          {!session ? (
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 bg-blue-600 text-white text-center rounded-xl font-semibold"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                href={getDashboardLink() || "/"}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-slate-700 font-medium"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="block w-full text-left px-4 py-3 text-red-600 font-medium"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
