import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, forbidden, getAuthUser, notFound, unauthorized } from "@/lib/authz";

const allowedTransitions: Record<string, string[]> = {
  PENDING: ["APPROVED", "CANCELLED"],
  APPROVED: ["COMPLETED", "CANCELLED"],
  COMPLETED: [],
  CANCELLED: [],
};

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUser();
    if (!user) return unauthorized();

    const { id } = await params;
    const body = await req.json();
    const nextStatus = String(body.status || "").toUpperCase();

    if (!nextStatus) return badRequest("Status is required");

    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        patient: true,
        doctor: true,
      },
    });

    if (!appointment) return notFound("Appointment not found");

    const isDoctorOwner = user.role === "DOCTOR" && appointment.doctor.userId === user.id;
    const isPatientOwner = user.role === "PATIENT" && appointment.patient.userId === user.id;
    const isAdmin = user.role === "ADMIN";

    if (!isDoctorOwner && !isPatientOwner && !isAdmin) {
      return forbidden("You cannot update this appointment");
    }

    if (isPatientOwner && nextStatus !== "CANCELLED") {
      return forbidden("Patients can only cancel their own appointments");
    }

    const allowed = allowedTransitions[appointment.status] || [];
    if (!allowed.includes(nextStatus)) {
      return badRequest(`Cannot move appointment from ${appointment.status} to ${nextStatus}`);
    }

    const updated = await prisma.appointment.update({
      where: { id },
      data: { status: nextStatus },
      include: {
        patient: { include: { user: true } },
        doctor: { include: { user: true } },
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Appointment Update Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
