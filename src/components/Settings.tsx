"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function Settings() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState({
    name: "",
    country: "",
    activeAccount: "",
  });

  useEffect(() => {
    if (session) {
      fetch("/api/user/settings")
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch(() => toast.error("Failed to fetch user data"));
    }
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch("/api/user/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) throw new Error("Failed to update settings");

      toast.success("Settings updated successfully!");
    } catch {
      toast.error("Error saving settings");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-h-screen"
    >
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">User Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <Input
              name="name"
              placeholder="Name"
              value={userData.name}
              onChange={handleChange}
            />
            <Input
              name="country"
              placeholder="Country"
              value={userData.country}
              onChange={handleChange}
            />
            <Input
              name="activeAccount"
              placeholder="Active Account"
              value={userData.activeAccount}
              onChange={handleChange}
            />
            <Button className="w-full" onClick={handleSave}>
              Save Changes
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
