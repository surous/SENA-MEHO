import { Stethoscope, Ambulance, FlaskConical, Pill, Clock, HeartPulse } from "lucide-react";

const services = [
  {
    title: "Emergency Care",
    description: "Instant medical response for critical situations, available 24 hours a day.",
    icon: Ambulance,
  },
  {
    title: "Cardiology",
    description: "Advanced heart care and surgical procedures by top-tier specialists.",
    icon: HeartPulse,
  },
  {
    title: "Diagnostics",
    description: "State-of-the-art laboratory testing for precise medical results.",
    icon: FlaskConical,
  },
  {
    title: "Pharmacy",
    description: "Certified medical dispensary providing quality-assured medications.",
    icon: Pill,
  },
  {
    title: "Pediatrics",
    description: "Specialized care for children and infants in a safe environment.",
    icon: Stethoscope,
  },
  {
    title: "Consultation",
    description: "Expert advice and health monitoring from senior medical staff.",
    icon: Clock,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
          <div className="max-w-2xl">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-6 leading-tight">
              Modern <br /> Healthcare.
            </h2>
            <p className="text-lg text-slate-500 font-bold leading-relaxed">
              We provide a comprehensive range of medical services driven by quality, efficiency, and patient success.
            </p>
          </div>
          <div className="hidden lg:block pb-4">
             <div className="h-1 w-32 bg-blue-600 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-12 rounded-[3rem] bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 group"
            >
              <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-10 group-hover:bg-slate-900 group-hover:border-slate-900 transition-colors">
                <service.icon className="w-10 h-10 text-slate-900 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-3xl font-black text-slate-900 mb-4">{service.title}</h4>
              <p className="text-xl text-slate-500 font-bold leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
