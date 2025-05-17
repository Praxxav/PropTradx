/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Spinner from "./ui/spinner";

interface FormData {
  country: string;
  accountType: string;
  platform: string;
  accountSize: string;
  price: number;
  phoneNumber: string;
  address: string;
}

export default function VerifyForm() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {


    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      try {
        const parsedFormData = JSON.parse(storedFormData);
        setFormData(parsedFormData);
      } catch (err) {
        console.error("Invalid form data in localStorage", err); 
      }
    }
  }, []);

  const loadRazorpayScript = () => {
    return new Promise<boolean>((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async () => {
    if (!formData?.phoneNumber || !formData?.address) {
      setValidationError("Phone number and address are required.");
      return;
    }

    setValidationError(null);
    setIsSubmitting(true);

    if (!session?.user) {
      alert("User session missing. Please log in again.");
      setIsSubmitting(false);
      return;
    }

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Failed to load Razorpay SDK. Please check your connection.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/Razorpay/createOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: formData.price * 100 }),
      });

      if (!res.ok) throw new Error("Failed to create order");
      const data = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: formData.price * 100,
        currency: "USD",
        name: session.user.name,
        description: "PropTradX Payment",
        order_id: data.id,
        handler: function (response: { [key: string]: unknown }) {
          alert("✅ Payment initiated. Implement verification next.");
          console.log("Payment response:", response);
        },
        prefill: {
          name: session.user.name,
          email: session.user.email,
          contact: formData.phoneNumber,
        },
        theme: { color: "#10B981" },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="large" color="green" />
      </div>
    );
  }

  if (!session?.user || !formData) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-white space-y-4">
        <p>Something went wrong. Please refresh or login again.</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen pt-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="w-full max-w-2xl p-1 rounded-3xl bg-gradient-to-tr from-[#1e3c72] via-[#2a5298] to-[#1e3c72] shadow-xl">
          <div className="bg-zinc-900/80 backdrop-blur-md rounded-[inherit] p-6 sm:p-10 text-white">
            <CardHeader>
              <CardTitle className="text-center text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">
                Verify Your Details
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6 text-sm sm:text-base">
              <div className="space-y-2">
                <Label className="text-gray-400">Name:</Label>
                <p>{session.user.name}</p>
                <Label className="text-gray-400">Email:</Label>
                <p>{session.user.email}</p>
                <Label className="text-gray-400">Phone:</Label>
                <p>{formData.phoneNumber || "Not Provided"}</p>
                <Label className="text-gray-400">Address:</Label>
                <p>{formData.address || "Not Provided"}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-400">Country:</Label>
                <p>{formData.country}</p>
                <Label className="text-gray-400">Account Type:</Label>
                <p>{formData.accountType}</p>
                <Label className="text-gray-400">Platform:</Label>
                <p>{formData.platform}</p>
                <Label className="text-gray-400">Account Size:</Label>
                <p>{formData.accountSize}</p>
                <Label className="text-gray-400">Total Price:</Label>
                <p className="font-bold text-xl text-green-400">${formData.price}</p>
              </div>

              {validationError && (
                <p className="text-red-500 text-center font-medium">{validationError}</p>
              )}

              <motion.button
                className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 transition-all duration-300 ease-in-out transform"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "14px 24px",
                  borderRadius: "14px",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "15px",
                  letterSpacing: "1px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.25)",
                  textTransform: "uppercase",
                }}
                onClick={handleSubmit}
              >
                {isSubmitting ? <Spinner size="small" color="green" /> : "Proceed to Payment"}
              </motion.button>
            </CardContent>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
