import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { forbidden, getAuthUser, notFound, unauthorized } from "@/lib/authz";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUser();
    if (!user) return unauthorized();

    const { id } = await params;

    const patient = await prisma.patient.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        appointments: {
          include: {
            doctor: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                  },
                },
                department: true,
              },
            },
          },
          orderBy: { date: "desc" },
        },
        healthReports: {
          orderBy: { createdAt: "desc" },
        },
        medicalRecords: {
          include: {
            doctor: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                  },
                },
              },
            },
            prescriptions: {
              orderBy: { createdAt: "desc" },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!patient) return notFound("Patient not found");

    const isOwnPatientProfile = user.role === "PATIENT" && patient.userId === user.id;
    const isAdmin = user.role === "ADMIN";
    const isLinkedDoctor =
      user.role === "DOCTOR" &&
      patient.appointments.some((appointment) => appointment.doctor.userId === user.id);

    if (!isOwnPatientProfile && !isAdmin && !isLinkedDoctor) {
      return forbidden("You cannot access this patient record");
    }

    return NextResponse.json(patient);
  } catch (error) {
    console.error("Patient Fetch Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
