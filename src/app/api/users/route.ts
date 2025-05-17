import { NextResponse } from "next/server";
import { prisma } from "@/lib/authdb/prisma";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/app/api/auth/Userauth/auth";


export async function GET() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
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
  const body = await req.json();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      phone: body.phoneNumber,
      address: body.address,
      country: body.country,
      accountType: body.accountType,
      platform: body.platform,
      accountSize: body.accountSize,
      price: parseInt(body.price),
    },
  });

  return NextResponse.json(updatedUser);
}
