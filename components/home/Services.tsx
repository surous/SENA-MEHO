import { Stethoscope, Ambulance, FlaskConical, Pill, Clock, HeartPulse } from "lucide-react";

const services = [
  {
    title: "Emergency Care",
    description: "24/7 immediate assistance for critical medical conditions and accidents.",
    icon: Ambulance,
  },
  {
    title: "OPD Services",
    description: "Expert consultations and diagnostic services for outpatients.",
    icon: Stethoscope,
  },
  {
    title: "Laboratory Tests",
    description: "Advanced diagnostic testing with highly accurate results.",
    icon: FlaskConical,
  },
  {
    title: "Pharmacy",
    description: "In-house pharmacy providing authentic medications and expert advice.",
    icon: Pill,
  },
  {
    title: "Cardiology",
    description: "Comprehensive heart care by world-renowned specialists.",
    icon: HeartPulse,
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock medical support and patient assistance.",
    icon: Clock,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-16 max-w-3xl">
          <h2 className="text-slate-900 text-5xl font-black mb-6">Our Medical Services</h2>
          <p className="text-xl text-slate-700 leading-relaxed font-medium">
            We provide essential healthcare services designed for reliability and clear communication with our patients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-10 rounded-xl border-2 border-slate-200 bg-white hover:border-blue-600 transition-all group"
            >
              <div className="w-16 h-16 rounded-lg bg-slate-900 flex items-center justify-center mb-8">
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-black text-slate-900 mb-4">{service.title}</h4>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
