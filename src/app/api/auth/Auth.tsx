"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";

export default function Auth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingOAuth, setLoadingOAuth] = useState(false);

  // New name state for JWT sign-in
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle OAuth Sign-In
 const handleOAuth = async (provider: string) => {
  setLoadingOAuth(true);
  try {
    // Sign out first to clear existing session
    await signOut({ redirect: false });
    
    // Then initiate new sign-in
    await signIn(provider, { 
      redirect: true,
      callbackUrl: "/dashboard"
    });
  }  finally {
    setLoadingOAuth(false);
  }
};

  const handleLogin = async () => {
    if (!name || !email || !password) {
      toast.error("Please enter name, email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        name,     
        email,
        password,
      });

      if (res?.error) {
        throw new Error(res.error);
      }

      toast.success("Logged in successfully!");
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
      className="flex justify-center items-center min-h-screen fixed inset-0 pt-16"
    >
      <Card className="w-full max-w-md p-8 text-white shadow-2xl rounded-3xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold mb-2">
            🔑 Signin Or Signup <span className="text-blue-400">PropTradX</span>
          </CardTitle>
          <p className="text-gray-400 text-center">Trade smarter with AI insights.</p>
        </CardHeader>

        <CardContent className="flex flex-col space-y-5">
          {/* OAuth Buttons */}
          <Button
            className="flex items-center justify-center gap-3 bg-white text-black hover:bg-gray-100 border border-gray-300 transition-all"
            onClick={() => handleOAuth("google")}
            disabled={loadingOAuth}
          >
            <FcGoogle size={22} />
            <span className="font-medium">
              {loadingOAuth ? "Signing in..." : "Continue with Google"}
            </span>
          </Button>

          <Button
            className="flex items-center justify-center gap-3 bg-gray-700 hover:bg-gray-600 transition-all"
            onClick={() => handleOAuth("github")}
            disabled={loadingOAuth}
          >
            <FaGithub size={22} />
            <span className="font-medium">
              {loadingOAuth ? "Signing in..." : "Continue with GitHub"}
            </span>
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 text-gray-400">
            <div className="w-full h-px bg-gray-600"></div>
            or
            <div className="w-full h-px bg-gray-600"></div>
          </div>

          {/* Email & Password Login with Name */}
          <div className="flex flex-col space-y-3">
            <Label className="text-gray-400">Name</Label>
            <Input
              type="text"
              placeholder="Enter your name"
              className="bg-gray-700 text-white focus:ring focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />

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
