import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, forbidden, getAuthUser, unauthorized } from "@/lib/authz";

export async function POST(req: Request) {
  try {
    const user = await getAuthUser();
    if (!user) return unauthorized();
    if (user.role !== "PATIENT") {
      return forbidden("Only patients can book appointments");
    }

    const body = await req.json();
    const { doctorId, date, reason } = body;

    if (!doctorId || !date || !reason?.trim()) {
      return badRequest("Doctor, date, and reason are required");
    }

    const appointmentDate = new Date(date);
    if (Number.isNaN(appointmentDate.getTime())) {
      return badRequest("Appointment date is invalid");
    }

    if (appointmentDate <= new Date()) {
      return badRequest("Appointment date must be in the future");
    }

    const patient = await prisma.patient.findUnique({
      where: { userId: user.id },
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient profile not found" }, { status: 404 });
    }

    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId },
    });

    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    const slotStart = appointmentDate;
    const slotEnd = new Date(slotStart.getTime() + 30 * 60 * 1000);

    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        doctorId,
        status: { in: ["PENDING", "APPROVED"] },
        date: {
          gte: slotStart,
          lt: slotEnd,
        },
      },
    });

    if (existingAppointment) {
      return badRequest("This doctor already has an appointment in that time slot");
    }

    const appointment = await prisma.appointment.create({
      data: {
        patientId: patient.id,
        doctorId,
        date: appointmentDate,
        reason: reason.trim(),
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
    const user = await getAuthUser();
    if (!user) return unauthorized();

    let appointments = [];

    if (user.role === "ADMIN") {
      appointments = await prisma.appointment.findMany({
        include: {
          patient: { include: { user: true } },
          doctor: { include: { user: true } },
        },
        orderBy: { date: "asc" },
      });
    } else if (user.role === "DOCTOR") {
      const doctor = await prisma.doctor.findUnique({
        where: { userId: user.id },
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
    } else if (user.role === "PATIENT") {
      const patient = await prisma.patient.findUnique({
        where: { userId: user.id },
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
