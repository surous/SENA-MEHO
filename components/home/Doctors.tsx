const doctors = [
  {
    name: "Dr. Sarah Wilson",
    specialty: "Senior Cardiologist",
    image: "https://images.unsplash.com/photo-1559839734-2b71f153678f?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Dr. James Miller",
    specialty: "Emergency Physician",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Dr. Elena Rodriguez",
    specialty: "Pediatrician",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400",
  },
];

export default function Doctors() {
  return (
    <section id="doctors" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-16 max-w-3xl">
          <h2 className="text-slate-900 text-5xl font-black mb-6">Expert Specialists</h2>
          <p className="text-xl text-slate-700 leading-relaxed font-medium">
            Meet our team of highly qualified medical professionals dedicated to your well-being.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden border-2 border-slate-200 shadow-sm"
            >
              <div className="h-72 overflow-hidden bg-slate-100">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 text-left">
                <h4 className="text-2xl font-black text-slate-900 mb-2">{doctor.name}</h4>
                <p className="text-blue-700 font-bold text-lg mb-6 underline decoration-2">{doctor.specialty}</p>
                <button className="w-full py-4 bg-slate-900 text-white rounded-lg font-bold hover:bg-black transition-all">
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
