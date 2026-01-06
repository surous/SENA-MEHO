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
    const { content, vitals } = body;

    console.log("Health Report Submission:", { content, vitals, userId: (session as any).user.id });

    // Try to find patient profile
    let patient = await prisma.patient.findUnique({
      where: { userId: (session as any).user.id },
    });

    // If patient profile doesn't exist, create it automatically
    if (!patient) {
      console.log("Patient profile not found, creating one for user:", (session as any).user.id);
      try {
        patient = await prisma.patient.create({
          data: {
            userId: (session as any).user.id,
          },
        });
        console.log("Patient profile created successfully:", patient.id);
      } catch (createError) {
        console.error("Error creating patient profile:", createError);
        return NextResponse.json({ 
          error: "Failed to create patient profile",
          details: createError instanceof Error ? createError.message : "Unknown error"
        }, { status: 500 });
      }
    }

    // Vitals is already a string from the frontend, don't double-stringify
    const vitalsString = typeof vitals === 'string' ? vitals : JSON.stringify(vitals);

    const report = await prisma.healthReport.create({
      data: {
        patientId: patient.id,
        content,
        vitals: vitalsString,
      },
    });

    console.log("Health report created successfully:", report.id);
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
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let reports;

    if ((session as any).user.role === "DOCTOR") {
      // For simplicity, doctors see all reports for now or we could filter by their patients
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
    } else {
      const patient = await prisma.patient.findUnique({
        where: { userId: (session as any).user.id },
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
