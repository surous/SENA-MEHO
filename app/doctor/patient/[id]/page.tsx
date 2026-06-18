"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  ChevronLeft,
  User,
  Calendar,
  Mail,
  Heart,
  Activity,
  Droplets,
  Scale,
  FileText,
  Pill,
  Save
} from "lucide-react";
import Link from "next/link";

export default function PatientEMRPage() {
  const params = useParams();
  const patientId = params.id as string;
  
  const [patient, setPatient] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [clinicalNote, setClinicalNote] = useState("");
  const [prescription, setPrescription] = useState({ medication: "", dosage: "", duration: "" });

  useEffect(() => {
    async function fetchPatientData() {
      try {
        const res = await fetch(`/api/patients/${patientId}`);

        if (!res.ok) {
          throw new Error("Failed to fetch patient record");
        }

        const patientData = await res.json();
        setPatient(patientData);
        setAppointments(patientData.appointments || []);
        setReports(patientData.healthReports || []);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPatientData();
  }, [patientId]);

  const handleSaveNote = async () => {
    try {
      const res = await fetch("/api/medical-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientId, content: clinicalNote }),
      });

      if (!res.ok) {
        throw new Error("Failed to save clinical note");
      }

      const note = await res.json();
      setPatient((current: any) => ({
        ...current,
        medicalRecords: [note, ...(current?.medicalRecords || [])],
      }));
      alert("Clinical note saved successfully!");
      setClinicalNote("");
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Unable to save clinical note. Please try again.");
    }
  };

  const handlePrescribe = async () => {
    try {
      const res = await fetch("/api/prescriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientId, ...prescription }),
      });

      if (!res.ok) {
        throw new Error("Failed to add prescription");
      }

      const note = await res.json();
      setPatient((current: any) => ({
        ...current,
        medicalRecords: [note, ...(current?.medicalRecords || [])],
      }));
      alert(`Prescription added: ${prescription.medication}`);
      setPrescription({ medication: "", dosage: "", duration: "" });
    } catch (error) {
      console.error("Error adding prescription:", error);
      alert("Unable to add prescription. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-400 font-bold">Loading patient record...</p>
        </div>
      </div>
    );
  }

  const latestReport = reports[0];
  const latestVitals = (() => {
    try {
      return latestReport ? JSON.parse(latestReport.vitals || "{}") : {};
    } catch {
      return {};
    }
  })();
  const prescriptions = patient?.medicalRecords?.flatMap((record: any) => record.prescriptions || []) || [];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <Link href="/doctor" className="inline-flex items-center space-x-2 text-slate-400 hover:text-blue-600 mb-10 transition-colors group">
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </div>
          <span className="font-black uppercase tracking-widest text-xs">Back to Dashboard</span>
        </Link>

        {/* Patient Header */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-xl mb-10">
          <div className="flex items-start gap-8">
            <div className="w-24 h-24 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <User className="w-12 h-12 text-blue-600" />
            </div>
            <div className="flex-grow">
              <h1 className="text-3xl font-black text-slate-900 mb-2">
                {patient?.user?.name || "Patient Name"}
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-slate-400" />
                  <span className="text-sm font-bold text-slate-600">
                    {patient?.user?.email || "email@example.com"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-slate-400" />
                  <span className="text-sm font-bold text-slate-600">
                    DOB: {patient?.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-slate-400" />
                  <span className="text-sm font-bold text-slate-600">
                    Gender: {patient?.gender || "Not specified"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          {/* Left Column - Vitals & History */}
          <div className="xl:col-span-2 space-y-10">
            {/* Latest Vitals */}
            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-6">Current Vitals</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-red-50 rounded-2xl p-6">
                  <Heart className="w-6 h-6 text-red-500 mb-3" />
                  <div className="text-3xl font-black text-slate-900">
                    {latestVitals.heartRate || "--"}
                  </div>
                  <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Heart Rate</div>
                </div>
                <div className="bg-blue-50 rounded-2xl p-6">
                  <Activity className="w-6 h-6 text-blue-500 mb-3" />
                  <div className="text-3xl font-black text-slate-900">
                    {latestVitals.bloodPressure || "--"}
                  </div>
                  <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Blood Pressure</div>
                </div>
                <div className="bg-green-50 rounded-2xl p-6">
                  <Scale className="w-6 h-6 text-green-500 mb-3" />
                  <div className="text-3xl font-black text-slate-900">
                    {latestVitals.weight || "--"}
                  </div>
                  <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Weight (kg)</div>
                </div>
                <div className="bg-amber-50 rounded-2xl p-6">
                  <Droplets className="w-6 h-6 text-amber-500 mb-3" />
                  <div className="text-3xl font-black text-slate-900">
                    {latestVitals.sugar || "--"}
                  </div>
                  <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Blood Sugar</div>
                </div>
              </div>
            </section>

            {/* Clinical Notes */}
            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-6">Add Clinical Note</h2>
              <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-lg">
                <textarea
                  value={clinicalNote}
                  onChange={(e) => setClinicalNote(e.target.value)}
                  placeholder="Enter clinical observations, diagnosis, treatment plan..."
                  className="w-full h-40 px-6 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold resize-none text-slate-900"
                />
                <button
                  onClick={handleSaveNote}
                  className="mt-4 w-full bg-blue-600 text-white py-4 rounded-xl font-black hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  <span>Save Clinical Note</span>
                </button>
              </div>
            </section>

            {/* Prescription */}
            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-6">Prescribe Medication</h2>
              <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-lg space-y-4">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                    Medication Name
                  </label>
                  <input
                    type="text"
                    value={prescription.medication}
                    onChange={(e) => setPrescription({...prescription, medication: e.target.value})}
                    placeholder="e.g., Lisinopril"
                    className="w-full px-6 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                      Dosage
                    </label>
                    <input
                      type="text"
                      value={prescription.dosage}
                      onChange={(e) => setPrescription({...prescription, dosage: e.target.value})}
                      placeholder="e.g., 10mg"
                      className="w-full px-6 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={prescription.duration}
                      onChange={(e) => setPrescription({...prescription, duration: e.target.value})}
                      placeholder="e.g., 30 days"
                      className="w-full px-6 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-900"
                    />
                  </div>
                </div>
                <button
                  onClick={handlePrescribe}
                  className="w-full bg-green-600 text-white py-4 rounded-xl font-black hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                >
                  <Pill className="w-5 h-5" />
                  <span>Add Prescription</span>
                </button>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-6">Clinical Notes</h2>
              <div className="space-y-4">
                {patient?.medicalRecords?.length > 0 ? patient.medicalRecords.map((record: any) => (
                  <div key={record.id} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-black text-slate-900">
                        {record.doctor?.user?.name || "Clinical staff"}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        {new Date(record.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-600 leading-relaxed">{record.content}</p>
                  </div>
                )) : (
                  <p className="text-sm text-slate-400 font-bold text-center py-8">No clinical notes yet</p>
                )}
              </div>
            </section>
          </div>

          {/* Right Column - History */}
          <div className="space-y-10">
            {/* Appointment History */}
            <section>
              <h2 className="text-xl font-black text-slate-900 mb-6">Appointment History</h2>
              <div className="space-y-3">
                {appointments.length > 0 ? appointments.slice(0, 5).map((appt) => (
                  <div key={appt.id} className="bg-white border border-slate-100 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-black text-slate-900">
                        {new Date(appt.date).toLocaleDateString()}
                      </span>
                      <span className={`text-xs font-black px-2 py-1 rounded-full ${
                        appt.status === "COMPLETED" ? "bg-green-50 text-green-700" :
                        appt.status === "APPROVED" ? "bg-blue-50 text-blue-700" :
                        "bg-amber-50 text-amber-700"
                      }`}>
                        {appt.status}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-500">{appt.reason || "General Consultation"}</p>
                  </div>
                )) : (
                  <p className="text-sm text-slate-400 font-bold text-center py-8">No appointments found</p>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-900 mb-6">Prescriptions</h2>
              <div className="space-y-3">
                {prescriptions.length > 0 ? prescriptions.map((item: any) => (
                  <div key={item.id} className="bg-white border border-slate-100 rounded-xl p-4">
                    <div className="font-black text-slate-900">{item.medication}</div>
                    <p className="text-xs font-bold text-slate-500 mt-1">
                      {item.dosage} · {item.duration}
                    </p>
                  </div>
                )) : (
                  <p className="text-sm text-slate-400 font-bold text-center py-8">No prescriptions found</p>
                )}
              </div>
            </section>

            {/* Health Reports */}
            <section>
              <h2 className="text-xl font-black text-slate-900 mb-6">Health Reports</h2>
              <div className="space-y-3">
                {reports.length > 0 ? reports.slice(0, 5).map((report) => (
                  <div key={report.id} className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-bold text-slate-400">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-700 line-clamp-2">{report.content}</p>
                  </div>
                )) : (
                  <p className="text-sm text-slate-400 font-bold text-center py-8">No reports submitted</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
