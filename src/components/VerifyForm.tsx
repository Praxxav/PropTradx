"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface UserData {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

interface FormData {
  country: string;
  accountType: string;
  platform: string;
  accountSize: string;
  price: number;
}

export default function VerifyForm() {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch formData from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("formData");
    if (stored) {
      try {
        setFormData(JSON.parse(stored));
      } catch (err) {
        console.error("Invalid form data in localStorage", err);
      }
    }
  }, []);

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users");

        if (!res.ok) {
          if (res.status === 401) {
            window.location.href = "/user/signup"; // Redirect to login if unauthorized
          } else {
            throw new Error(`Failed to fetch user: ${res.status}`);
          }
        }

        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Unable to fetch user details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Loading or Error States
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">Loading...</div>
    );
  }

  if (error || !formData || !userData) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-white space-y-4">
        <p>{error || "Something went wrong. Please refresh."}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  // Main UI
  return (
    <div className="flex justify-center items-center min-h-screen pt-16">
      <Card className="w-full max-w-xl p-8 text-white shadow-2xl rounded-3xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold mb-4">
            Verify Your Details
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* User Info */}
          <div>
            <Label className="text-gray-400">Name:</Label>
            <p>{userData.name}</p>
            <Label className="text-gray-400">Email:</Label>
            <p>{userData.email}</p>
            <Label className="text-gray-400">Phone:</Label>
            <p>{userData.phone || "Not Provided"}</p>
            <Label className="text-gray-400">Address:</Label>
            <p>{userData.address || "Not Provided"}</p>
          </div>

          {/* Selected Options */}
          <div>
            <Label className="text-gray-400">Selected Country:</Label>
            <p>{formData.country}</p>
            <Label className="text-gray-400">Account Type:</Label>
            <p>{formData.accountType}</p>
            <Label className="text-gray-400">Platform:</Label>
            <p>{formData.platform}</p>
            <Label className="text-gray-400">Account Size:</Label>
            <p>{formData.accountSize}</p>
            <Label className="text-gray-400">Total Price:</Label>
            <p className="font-bold text-lg">${formData.price}</p>
          </div>

          {/* Proceed to Payment */}
          <Button
            className="bg-green-500 hover:bg-green-600 transition-all w-full"
            onClick={() => {
              // Payment logic goes here
              alert("Proceeding to payment...");
            }}
          >
            Proceed to Payment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
