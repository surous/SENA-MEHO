import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <h2 className="text-slate-900 text-5xl font-black mb-6">Contact Sena Medical</h2>
            <p className="text-xl text-slate-700 leading-relaxed font-medium mb-10">
              We are available 24/7 for emergency and regular inquiries. Please reach out to us using the information below or the contact form.
            </p>

            <div className="space-y-8">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="font-black text-2xl text-slate-900">Phone</div>
                  <div className="text-xl text-slate-700 font-bold">+1 (555) 123-4567</div>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="font-black text-2xl text-slate-900">Email</div>
                  <div className="text-xl text-slate-700 font-bold">support@sena.com</div>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="font-black text-2xl text-slate-900">Location</div>
                  <div className="text-xl text-slate-700 font-bold">123 Hospital St, Medical District, NY</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-10 rounded-2xl border-4 border-slate-200">
            <form className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-black text-slate-900 mb-3">First Name</label>
                  <input
                    type="text"
                    className="w-full px-5 py-4 rounded-lg border-2 border-slate-300 focus:border-blue-600 outline-none transition-all text-lg font-medium"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-lg font-black text-slate-900 mb-3">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-5 py-4 rounded-lg border-2 border-slate-300 focus:border-blue-600 outline-none transition-all text-lg font-medium"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-lg font-black text-slate-900 mb-3">Email</label>
                <input
                  type="email"
                  className="w-full px-5 py-4 rounded-lg border-2 border-slate-300 focus:border-blue-600 outline-none transition-all text-lg font-medium"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-lg font-black text-slate-900 mb-3">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-5 py-4 rounded-lg border-2 border-slate-300 focus:border-blue-600 outline-none transition-all text-lg font-medium resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <button className="w-full bg-slate-900 text-white font-black py-5 rounded-lg text-xl hover:bg-black transition-all">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
