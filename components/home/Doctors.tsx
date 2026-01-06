const doctors = [
  {
    name: "Dr. Sena",
    specialty: "Founder & Chief Medical Officer",
    image: "https://images.unsplash.com/photo-1559839734-2b71f153678f?auto=format&fit=crop&q=80&w=800",
    description: "Dr. Sena leads our medical team with 20+ years of experience in healthcare excellence.",
  },
  {
    name: "Dr. James Miller",
    specialty: "Head of Emergency Care",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800",
    description: "Specializing in trauma and critical care response with world-class precision.",
  },
  {
    name: "Dr. Elena Rodriguez",
    specialty: "Pediatric Specialist",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800",
    description: "Providing compassionate and expert care for our youngest patients.",
  },
];

export default function Doctors() {
  return (
    <section id="doctors" className="py-32 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-6">World Class Experts</h2>
          <p className="text-lg text-slate-500 font-bold max-w-2xl mx-auto leading-relaxed">
            Our medical staff consists of internationally recognized specialists dedicated to providing the highest level of care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 group hover:-translate-y-2 transition-all duration-500"
            >
              <div className="h-[450px] overflow-hidden relative">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-10 text-left">
                <div className="mb-6">
                    <h4 className="text-3xl font-black text-slate-900 mb-2">{doctor.name}</h4>
                    <span className="text-blue-600 font-black text-lg uppercase tracking-wider">{doctor.specialty}</span>
                </div>
                <p className="text-lg text-slate-500 font-bold leading-relaxed mb-8">
                    {doctor.description}
                </p>
                <div className="pt-8 border-t border-slate-100">
                    <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
                        <span>Book Visit</span>
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
