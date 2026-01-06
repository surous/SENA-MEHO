import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session as any).user.role !== "PATIENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { doctorId, date, reason } = body;

    const patient = await prisma.patient.findUnique({
      where: { userId: (session as any).user.id },
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient profile not found" }, { status: 404 });
    }

    const appointment = await prisma.appointment.create({
      data: {
        patientId: patient.id,
        doctorId,
        date: new Date(date),
        reason,
        status: "PENDING",
      },
      include: {
        doctor: {
          include: {
            user: true,
          },
        },
      },
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Booking Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let appointments;

    if ((session as any).user.role === "DOCTOR") {
      const doctor = await prisma.doctor.findUnique({
        where: { userId: (session as any).user.id },
      });
      if (!doctor) return NextResponse.json([]);
      
      appointments = await prisma.appointment.findMany({
        where: { doctorId: doctor.id },
        include: {
          patient: {
            include: {
              user: true,
            },
          },
        },
        orderBy: { date: "asc" },
      });
    } else if ((session as any).user.role === "PATIENT") {
      const patient = await prisma.patient.findUnique({
        where: { userId: (session as any).user.id },
      });
      if (!patient) return NextResponse.json([]);

      appointments = await prisma.appointment.findMany({
        where: { patientId: patient.id },
        include: {
          doctor: {
            include: {
              user: true,
            },
          },
        },
        orderBy: { date: "asc" },
      });
    }

    return NextResponse.json(appointments);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
