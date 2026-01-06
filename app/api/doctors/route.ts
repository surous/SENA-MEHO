import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
        department: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(doctors);
  } catch (error) {
    console.error("Fetch Doctors Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
