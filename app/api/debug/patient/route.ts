import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Debug endpoint to check patient profile
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    console.log("Session user:", session.user);

    const patient = await prisma.patient.findUnique({
      where: { userId: session.user.id },
      include: {
        user: true,
      },
    });

    if (!patient) {
      // Try to create a patient profile if it doesn't exist
      if (session.user.role === "PATIENT") {
        const newPatient = await prisma.patient.create({
          data: {
            userId: session.user.id,
          },
          include: {
            user: true,
          },
        });
        
        return NextResponse.json({
          message: "Patient profile created",
          patient: newPatient,
        });
      }
      
      return NextResponse.json({
        error: "Patient profile not found",
        userId: session.user.id,
        role: session.user.role,
      }, { status: 404 });
    }

    return NextResponse.json({
      message: "Patient profile exists",
      patient,
    });
  } catch (error) {
    console.error("Debug error:", error);
    return NextResponse.json({ 
      error: "Internal Server Error",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
