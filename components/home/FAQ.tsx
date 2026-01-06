"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do I book an appointment online?",
      a: "Simply create an account or log in, navigate to your Patient Command Center, and click 'Book Appointment'. You can select your preferred doctor and time slot instantly."
    },
    {
      q: "What medical services do you specialize in?",
      a: "We are a multi-specialty hospital with leading experts in Cardiology, Emergency Medicine, Pediatrics, Oncology, and modern Surgical Care."
    },
    {
      q: "Does Sena Medical accept health insurance?",
      a: "Yes, we partner with most major international and local insurance providers. You can even upload your insurance card to your digital profile for faster processing."
    },
    {
      q: "Is there 24/7 emergency support available?",
      a: "Absolutely. Our emergency department is fully staffed and operational 24 hours a day, 7 days a week, supported by our advanced imaging and trauma units."
    }
  ];

  return (
    <section className="bg-slate-50 py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="w-16 h-16 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Got Questions? <br /> We have Answers.</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden transition-all">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-8 py-8 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <span className="text-xl font-black text-slate-900">{faq.q}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === i ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-100 text-slate-400 rotate-0'}`}>
                   {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              
              <div 
                className={`px-8 transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-96 py-8 opacity-100 border-t border-slate-50' : 'max-h-0 py-0 opacity-0'}`}
              >
                <p className="text-lg text-slate-500 font-bold leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
