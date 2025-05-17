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
    country: "",
    accountType: "",
    platform: "",
    accountSize: "",
    phoneNumber: "",
    address: "",
    price: "",
  });
  const [price, setPrice] = useState<number | null>(null);

  const handleNext  = async () => {
    const formWithPrice = { ...form, price: price ?? 0, address: form.address ?? "" };
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
      className="flex justify-center items-center min-h-screen pt-16 bg-gradient-to-br from-gray-900 to-black"
    >
      <Card className="w-full max-w-xl p-8 text-white shadow-2xl rounded-3xl bg-gray-950">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold mb-4 text-white">
            Configure Your Account
          </CardTitle>
          <p className="text-gray-400 text-center mb-6">
            Select options to see the price.
          </p>
        </CardHeader>

        <CardContent className="flex flex-col space-y-5">
          {/* Country Selection */}
          <div className="space-y-2">
            <Label className="text-gray-400">Choose Country</Label>
            <select
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              className="w-full border border-gray-600 rounded-xl px-4 py-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
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
            <Label className="text-gray-400">Choose Account Type</Label>
            <div className="flex flex-wrap gap-2">
              {data.accountTypes.map((a) => (
                <Button
                  key={a.type}
                  onClick={() => setForm({ ...form, accountType: a.type })}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 transform ${
                    form.accountType === a.type
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white scale-105 shadow-lg"
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
            <Label className="text-gray-400">Choose Platform</Label>
            <div className="flex flex-wrap gap-2">
              {data.platforms.map((p) => (
                <Button
                  key={p.name}
                  onClick={() => setForm({ ...form, platform: p.name })}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 transform ${
                    form.platform === p.name
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-105 shadow-lg"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <Image
                    src={p.logo}
                    alt={p.name}
                    width={24}
                    height={24}
                    className="rounded"
                  />
                  {p.name}
                  {p.extraFee > 0 && (
                    <span className="ml-2 bg-green-600 text-xs px-2 py-1 rounded-full">
                      +${p.extraFee}
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Account Size */}
          <div className="space-y-2">
            <Label className="text-gray-400">Choose Account Size</Label>
            <div className="flex flex-wrap gap-2">
              {data.accountSizes.map((s) => (
                <Button
                  key={s.size}
                  onClick={() => setForm({ ...form, accountSize: s.size })}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 transform ${
                    form.accountSize === s.size
                      ? "bg-gradient-to-r from-green-500 to-teal-500 text-white scale-105 shadow-lg"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {s.size}
                </Button>
              ))}
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label className="text-gray-400">Phone Number</Label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={form.phoneNumber}
              onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
              className="w-full border border-gray-600 rounded-xl px-4 py-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label className="text-gray-400">Address</Label>
            <textarea
              placeholder="Enter your address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full border border-gray-600 rounded-xl px-4 py-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              rows={3}
            />
          </div>

          {/* Price Display */}
          {price !== null && (
            <div className="mt-6 p-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl text-center shadow-inner border border-blue-500">
              <p className="text-lg text-gray-300">Total Price:</p>
              <p className="text-3xl font-extrabold text-blue-400 animate-pulse">${price}</p>
            </div>
          )}

          {/* Next Button */}
          <Button
            className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-semibold py-3 rounded-xl shadow-md hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 active:scale-95 disabled:opacity-50"
            onClick={handleNext}
            disabled={
              !form.country ||
              !form.accountType ||
              !form.platform ||
              !form.accountSize ||
              !form.phoneNumber ||
              !form.address
            }
          >
            🚀 Save & Next
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
