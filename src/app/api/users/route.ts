import { NextResponse } from "next/server";
import { prisma } from "@/lib/authdb/prisma";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/app/api/auth/Userauth/auth"; // ✅ Import config

export async function GET() {
  const session = await getServerSession(NEXT_AUTH_CONFIG); // ✅ Pass config here

  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email ?? undefined },
    select: { name: true, email: true, phone: true, address: true }
  });

  return NextResponse.json(user);
}

export async function POST(req: Request) {
  const session = await getServerSession(NEXT_AUTH_CONFIG); // ✅ Pass config here
  const body = await req.json();

  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const updatedUser = await prisma.user.update({
    where: { email: session.user?.email ?? undefined },
    data: body
  });

  return NextResponse.json(updatedUser);
}
