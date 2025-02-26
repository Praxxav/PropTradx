"use client"; // Ensures interactivity in Next.js

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import useRouter
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";

export default function Auth() {
  const router = useRouter(); // ✅ Initialize router
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOAuth = (provider: string) => {
    window.location.href = `/api/auth/${provider}`;
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      toast.success(data.message);

      // ✅ Redirect to Dashboard after successful login
      router.push("/dashboard");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center items-center min-h-screen fixed inset-0"
    >
      <Card className="w-full max-w-md p-8 text-white shadow-2xl rounded-3xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold mb-2">
            🔑 Login to <span className="text-blue-400">PropTradX</span>
          </CardTitle>
          <p className="text-gray-400 text-center">Trade smarter with AI insights.</p>
        </CardHeader>

        <CardContent className="flex flex-col space-y-5">
          {/* OAuth Buttons */}
          <Button
            className="flex items-center justify-center gap-3 bg-white text-black hover:bg-gray-100 border border-gray-300 transition-all"
            onClick={() => handleOAuth("google")}
          >
            <FcGoogle size={22} />
            <span className="font-medium">Continue with Google</span>
          </Button>

          <Button
            className="flex items-center justify-center gap-3 bg-gray-700 hover:bg-gray-600 transition-all"
            onClick={() => handleOAuth("github")}
          >
            <FaGithub size={22} />
            <span className="font-medium">Continue with GitHub</span>
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 text-gray-400">
            <div className="w-full h-px bg-gray-600"></div>
            or
            <div className="w-full h-px bg-gray-600"></div>
          </div>

          {/* Email & Password Login */}
          <div className="flex flex-col space-y-3">
            <Label className="text-gray-400">Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-700 text-white focus:ring focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />

            <Label className="text-gray-400">Password</Label>
            <Input
              type="password"
              placeholder="Enter your password"
              className="bg-gray-700 text-white focus:ring focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />

            <Button
              onClick={handleLogin}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 transition-all mt-2"
            >
              {loading ? "Logging in..." : "Sign in"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
