import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, forbidden, getAuthUser, notFound, unauthorized } from "@/lib/authz";

export async function POST(req: Request) {
  try {
    const user = await getAuthUser();
    if (!user) return unauthorized();
    if (user.role !== "DOCTOR" && user.role !== "ADMIN") {
      return forbidden("Only clinical staff can create medical notes");
    }

    const body = await req.json();
    const patientId = String(body.patientId || "");
    const content = String(body.content || "").trim();

    if (!patientId || !content) {
      return badRequest("Patient and note content are required");
    }

    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
      include: { appointments: { include: { doctor: true } } },
    });

    if (!patient) return notFound("Patient not found");

    let doctor = await prisma.doctor.findFirst({
      where: user.role === "DOCTOR" ? { userId: user.id } : undefined,
    });

    if (!doctor) {
      return forbidden("Doctor profile not found");
    }

    const canWrite =
      user.role === "ADMIN" ||
      patient.appointments.some((appointment) => appointment.doctorId === doctor.id);

    if (!canWrite) {
      return forbidden("You cannot write notes for this patient");
    }

    const note = await prisma.medicalNote.create({
      data: {
        patientId,
        doctorId: doctor.id,
        content,
      },
      include: {
        doctor: { include: { user: true } },
        prescriptions: true,
      },
    });

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error("Medical Note Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
