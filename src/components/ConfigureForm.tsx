"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface ConfigureFormProps {
  onNext: () => void;
}

interface Data {
  countries: string[];
  accountTypes: { type: string }[];
  platforms: { name: string; logo: string; extraFee: number }[];
  accountSizes: { size: string; basePrice: { [key: string]: number } }[];
  price: number;
}

export default function ConfigureForm({ onNext }: ConfigureFormProps) {
  const [data, setData] = useState<Data | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    accountType: "",
    platform: "",
    accountSize: "",
    phoneNumber: "",
    address: "",
    price: "",
    termsAccepted: false,
  });
  const [price, setPrice] = useState<number | null>(null);

  const handleNext = async () => {
    const formWithPrice = { ...form, price: price ?? 0 };
    localStorage.setItem("formData", JSON.stringify(formWithPrice));
    try {
      await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formWithPrice),
      });
    } catch (error) {
      console.error("Error saving form data", error);
    }
    onNext();
  };

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Error loading JSON", err));
  }, []);

  useEffect(() => {
    if (data && form.accountType && form.accountSize && form.platform) {
      const accountSizeObj = data.accountSizes.find((a) => a.size === form.accountSize);
      const basePrice = accountSizeObj?.basePrice?.[form.accountType] || 0;
      const platformFee = data.platforms.find((p) => p.name === form.platform)?.extraFee || 0;
      setPrice(basePrice + platformFee);
    } else {
      setPrice(null);
    }
  }, [form, data]);

  if (!data)
    return (
      <div className="flex justify-center items-center h-screen">Loading...</div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex justify-center items-start min-h-screen py-10 px-4 bg-gradient-to-br from-gray-900 to-black"
    >
      <Card className="w-full max-w-3xl p-6 sm:p-8 text-white shadow-2xl rounded-lg bg-gray-950 border border-gray-800">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold mb-4 text-white">
            Configure Your Account
          </CardTitle>
          <p className="text-gray-400 text-center mb-6">Select options to see the price.</p>
        </CardHeader>

        <CardContent className="flex flex-col space-y-5">
          {/* Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-gray-400">First Name</Label>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="w-full border border-gray-600 rounded-md px-4 py-2 bg-gray-800 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-400">Last Name</Label>
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="w-full border border-gray-600 rounded-md px-4 py-2 bg-gray-800 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-400">Email</Label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-600 rounded-md px-4 py-2 bg-gray-800 text-white"
            />
          </div>

          {/* Country Selection */}
          <div className="space-y-2">
            <Label className="text-gray-400">Country</Label>
            <select
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              className="w-full border border-gray-600 rounded-md px-4 py-2 bg-gray-800 text-white"
            >
              <option value="">Select Country</option>
              {data.countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Account Type */}
          <div className="space-y-2">
            <Label className="text-gray-400">Account Type</Label>
            <div className="grid grid-cols-2 gap-3">
              {data.accountTypes.map((a) => (
                <Button
                  key={a.type}
                  variant="outline"
                  onClick={() => setForm({ ...form, accountType: a.type })}
                  className={`w-full rounded-md ${
                    form.accountType === a.type
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {a.type}
                </Button>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-2">
            <Label className="text-gray-400">Platform</Label>
            <div className="grid grid-cols-2 gap-3">
              {data.platforms.map((p) => (
                <Button
                  key={p.name}
                  variant="outline"
                  onClick={() => setForm({ ...form, platform: p.name })}
                  className={`w-full flex items-center gap-2 rounded-md ${
                    form.platform === p.name
                      ? "bg-pink-600 text-white border-pink-600"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <Image src={p.logo} alt={p.name} width={20} height={20} />
                  {p.name}
                  {p.extraFee > 0 && (
                    <span className="ml-auto text-xs bg-green-600 px-2 py-0.5 rounded">
                      +${p.extraFee}
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Account Size */}
          <div className="space-y-2">
            <Label className="text-gray-400">Account Size</Label>
            <div className="grid grid-cols-2 gap-3">
              {data.accountSizes.map((s) => (
                <Button
                  key={s.size}
                  variant="outline"
                  onClick={() => setForm({ ...form, accountSize: s.size })}
                  className={`w-full rounded-md ${
                    form.accountSize === s.size
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {s.size}
                </Button>
              ))}
            </div>
          </div>

          {/* Phone & Address */}
          <div className="space-y-2">
            <Label className="text-gray-400">Phone Number</Label>
            <input
              type="tel"
              value={form.phoneNumber}
              onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
              className="w-full border border-gray-600 rounded-md px-4 py-2 bg-gray-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-400">Address</Label>
            <textarea
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full border border-gray-600 rounded-md px-4 py-2 bg-gray-800 text-white"
              rows={3}
            />
          </div>

          {/* Terms */}
          <div className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={form.termsAccepted}
              onChange={(e) => setForm({ ...form, termsAccepted: e.target.checked })}
              className="accent-blue-500"
            />
            <Label className="text-gray-400">
              I agree to the <a href="#" className="text-blue-400 underline">Terms & Conditions</a>
            </Label>
          </div>

          {/* Price */}
          {price !== null && (
            <div className="mt-6 p-6 bg-gray-900 text-white rounded-lg text-center border border-blue-500">
              <p className="text-lg text-gray-300">Total Price:</p>
              <p className="text-3xl font-extrabold text-blue-400 animate-pulse">${price}</p>
            </div>
          )}

          {/* Submit */}
          <Button
            className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-semibold py-3 rounded-lg hover:from-emerald-600 hover:to-blue-700 transition"
            onClick={handleNext}
            disabled={
              !form.firstName ||
              !form.lastName ||
              !form.email ||
              !form.country ||
              !form.accountType ||
              !form.platform ||
              !form.accountSize ||
              !form.phoneNumber ||
              !form.address ||
              !form.termsAccepted
            }
          >
            🚀 Save & Next
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
