import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { forbidden, getAuthUser, unauthorized } from "@/lib/authz";

export async function POST(req: Request) {
  try {
    const user = await getAuthUser();
    if (!user) return unauthorized();
    if (user.role !== "PATIENT") return forbidden("Only patients can submit health reports");

    const body = await req.json();
    const { content, vitals } = body;

    if (!content?.trim()) {
      return NextResponse.json({ error: "Report content is required" }, { status: 400 });
    }

    let patient = await prisma.patient.findUnique({
      where: { userId: user.id },
    });

    if (!patient) {
      try {
        patient = await prisma.patient.create({
          data: {
            userId: user.id,
          },
        });
      } catch (createError) {
        console.error("Error creating patient profile:", createError);
        return NextResponse.json({ 
          error: "Failed to create patient profile",
          details: createError instanceof Error ? createError.message : "Unknown error"
        }, { status: 500 });
      }
    }

    const vitalsString = typeof vitals === 'string' ? vitals : JSON.stringify(vitals);

    const report = await prisma.healthReport.create({
      data: {
        patientId: patient.id,
        content: content.trim(),
        vitals: vitalsString,
      },
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error("Health Report Error:", error);
    return NextResponse.json({ 
      error: "Internal Server Error", 
      details: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const user = await getAuthUser();
    if (!user) return unauthorized();

    let reports = [];

    if (user.role === "ADMIN") {
      reports = await prisma.healthReport.findMany({
        include: {
          patient: {
            include: {
              user: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    } else if (user.role === "DOCTOR") {
      const doctor = await prisma.doctor.findUnique({
        where: { userId: user.id },
      });

      if (!doctor) return NextResponse.json([]);

      reports = await prisma.healthReport.findMany({
        where: {
          patient: {
            appointments: {
              some: {
                doctorId: doctor.id,
              },
            },
          },
        },
        include: {
          patient: {
            include: {
              user: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    } else {
      const patient = await prisma.patient.findUnique({
        where: { userId: user.id },
      });
      if (!patient) return NextResponse.json([]);

      reports = await prisma.healthReport.findMany({
        where: { patientId: patient.id },
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json(reports);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
