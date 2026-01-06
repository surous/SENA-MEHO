"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, ShieldCheck, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function MockPayment() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePayment = () => {
    setLoading(true);
    // Simulated payment processing
    setTimeout(() => {
      setLoading(false);
      toast.success("Payment Successful (Mock)!");
      router.push("/patient");
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-2xl">
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <CreditCard className="w-12 h-12 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Secure Checkout</h1>
        <p className="text-slate-500 mb-12">This is a simulated payment gateway for demo purposes. No real money will be charged.</p>
        
        <div className="bg-slate-50 p-8 rounded-[2rem] text-left mb-12 border border-slate-100">
           <div className="flex justify-between mb-4">
              <span className="text-slate-500 font-medium">Consultation Fee</span>
              <span className="text-slate-900 font-bold">$50.00</span>
           </div>
           <div className="flex justify-between mb-4">
              <span className="text-slate-500 font-medium">Service Charge</span>
              <span className="text-slate-900 font-bold">$5.00</span>
           </div>
           <div className="border-t border-slate-200 mt-4 pt-4 flex justify-between">
              <span className="text-slate-900 font-bold text-lg">Total</span>
              <span className="text-blue-600 font-bold text-2xl">$55.00</span>
           </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-slate-900 text-white font-bold py-5 rounded-3xl shadow-xl hover:bg-black transition-all disabled:opacity-50 flex items-center justify-center space-x-3 mb-8"
        >
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              <ShieldCheck className="w-6 h-6" />
              <span>Complete Mock Payment</span>
            </>
          )}
        </button>
        
        <div className="flex items-center justify-center space-x-2 text-slate-400 text-sm font-medium">
           <ShieldCheck className="w-4 h-4" />
           <span>Secured by DemoPay</span>
        </div>
      </div>
    </div>
  );
}
