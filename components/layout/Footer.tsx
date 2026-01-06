import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <Image 
                src="/logo.jpg" 
                alt="Sena Medical Hospital Logo" 
                width={150} 
                height={50} 
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-slate-400 max-w-sm">
              Providing world-class medical services with state-of-the-art technology and expert medical professionals.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="/#services" className="hover:text-blue-400 transition-colors">Services</Link></li>
              <li><Link href="/#doctors" className="hover:text-blue-400 transition-colors">Doctors</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-6">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li>123 Hospital St, Medical District</li>
              <li>Emergency: (555) 123-4567</li>
              <li>Email: contact@sena.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Sena Medical Hospital. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
