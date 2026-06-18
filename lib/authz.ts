import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export type AppRole = "ADMIN" | "DOCTOR" | "PATIENT";

export type AuthUser = {
  id: string;
  email?: string | null;
  name?: string | null;
  role: AppRole;
};

export async function getAuthUser(): Promise<AuthUser | null> {
  const session = await getServerSession(authOptions);
  const user = session?.user as AuthUser | undefined;

  if (!user?.id || !user.role) {
    return null;
  }

  return user;
}

export function unauthorized(message = "Unauthorized") {
  return NextResponse.json({ error: message }, { status: 401 });
}

export function forbidden(message = "Forbidden") {
  return NextResponse.json({ error: message }, { status: 403 });
}

export function badRequest(message = "Invalid request") {
  return NextResponse.json({ error: message }, { status: 400 });
}

export function notFound(message = "Not found") {
  return NextResponse.json({ error: message }, { status: 404 });
}

export function hasRole(user: AuthUser, roles: AppRole[]) {
  return roles.includes(user.role);
}
