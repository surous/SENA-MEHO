import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "PATIENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { content, vitals } = body;

    const patient = await prisma.patient.findUnique({
      where: { userId: session.user.id },
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient profile not found" }, { status: 404 });
    }

    const report = await prisma.healthReport.create({
      data: {
        patientId: patient.id,
        content,
        vitals: JSON.stringify(vitals),
      },
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error("Health Report Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let reports;

    if (session.user.role === "DOCTOR") {
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
        where: { userId: session.user.id },
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
