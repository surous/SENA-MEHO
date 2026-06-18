import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, forbidden, getAuthUser, notFound, unauthorized } from "@/lib/authz";

export async function POST(req: Request) {
  try {
    const user = await getAuthUser();
    if (!user) return unauthorized();
    if (user.role !== "DOCTOR" && user.role !== "ADMIN") {
      return forbidden("Only clinical staff can create prescriptions");
    }

    const body = await req.json();
    const patientId = String(body.patientId || "");
    const medication = String(body.medication || "").trim();
    const dosage = String(body.dosage || "").trim();
    const duration = String(body.duration || "").trim();

    if (!patientId || !medication || !dosage || !duration) {
      return badRequest("Patient, medication, dosage, and duration are required");
    }

    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
      include: { appointments: { include: { doctor: true } } },
    });

    if (!patient) return notFound("Patient not found");

    const doctor = await prisma.doctor.findFirst({
      where: user.role === "DOCTOR" ? { userId: user.id } : undefined,
    });

    if (!doctor) {
      return forbidden("Doctor profile not found");
    }

    const canWrite =
      user.role === "ADMIN" ||
      patient.appointments.some((appointment) => appointment.doctorId === doctor.id);

    if (!canWrite) {
      return forbidden("You cannot prescribe for this patient");
    }

    const note = await prisma.medicalNote.create({
      data: {
        patientId,
        doctorId: doctor.id,
        content: `Prescription issued: ${medication}`,
        prescriptions: {
          create: {
            medication,
            dosage,
            duration,
          },
        },
      },
      include: {
        doctor: { include: { user: true } },
        prescriptions: true,
      },
    });

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error("Prescription Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
