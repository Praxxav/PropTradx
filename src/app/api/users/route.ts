import { NextResponse } from "next/server";
import { prisma } from "@/lib/authdb/prisma";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/app/api/auth/Userauth/auth";

export async function GET() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      name: true,
      email: true,
      phone: true,
      address: true,
      country: true,
      accountType: true,
      platform: true,
      accountSize: true,
      price: true,
    },
  });

  return NextResponse.json(user);
}

export async function POST(req: Request) {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const updatedUser = await prisma.user.update({
    where: { email: session.user.email },
    data: {
      phone: body.phone,
      address: body.address,
      country: body.country,
      accountType: body.accountType,
      platform: body.platform,
      accountSize: body.accountSize,
      price: parseInt(body.totalPrice),
    },
  });

  return NextResponse.json(updatedUser);
}
