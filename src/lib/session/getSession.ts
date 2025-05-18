// lib/getSession.ts
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/app/api/auth/Userauth/auth"; // adjust if your authOptions path is different

export const getAuthSession = () => getServerSession(NEXT_AUTH_CONFIG);
