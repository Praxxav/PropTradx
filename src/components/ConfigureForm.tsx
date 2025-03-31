"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface Data {
  countries: string[];
  accountTypes: { type: string }[];
  platforms: { name: string; logo: string; extraFee: number }[];
  accountSizes: { size: string; basePrice: { [key: string]: number } }[];
}

export default function ConfigureForm() {
  const [data, setData] = useState<Data | null>(null);
  const [form, setForm] = useState({
    country: "",
    accountType: "",
    platform: "",
    accountSize: "",
  });

  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Error loading JSON", err));
  }, []);

  // Calculate price whenever form changes
  useEffect(() => {
    if (data && form.accountType && form.accountSize && form.platform) {
      const accountSizeObj = data.accountSizes.find(
        (a) => a.size === form.accountSize
      );
      const basePrice = accountSizeObj?.basePrice?.[form.accountType] || 0;

      const platformFee =
        data.platforms.find((p) => p.name === form.platform)?.extraFee || 0;

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center items-center min-h-screen pt-16"
    >
      <Card className="w-full max-w-xl p-8 text-white shadow-2xl rounded-3xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold mb-4">
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
              className="w-full border rounded p-2 bg-gray-700 text-white focus:ring focus:ring-blue-500"
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
                  onClick={() =>
                    setForm({ ...form, accountType: a.type })
                  }
                  className={`${
                    form.accountType === a.type
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-300"
                  } hover:bg-blue-600`}
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
                  onClick={() =>
                    setForm({ ...form, platform: p.name })
                  }
                  className={`flex items-center gap-2 ${
                    form.platform === p.name
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-300"
                  } hover:bg-blue-600`}
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
                    <span className="ml-2 bg-green-600 text-xs px-2 py-1 rounded">
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
                  onClick={() =>
                    setForm({ ...form, accountSize: s.size })
                  }
                  className={`${
                    form.accountSize === s.size
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-300"
                  } hover:bg-blue-600`}
                >
                  {s.size}
                </Button>
              ))}
            </div>
          </div>

          {/* Price Display */}
          {price !== null && (
            <div className="mt-6 p-4 bg-gray-800 text-white rounded-xl text-center">
              <p className="text-lg">Total Price:</p>
              <p className="text-2xl font-bold">${price}</p>
            </div>
          )}

          {/* Next Button */}
          <Button
            className="bg-green-500 hover:bg-green-600 transition-all mt-4"
            onClick={() => {
              localStorage.setItem("formData", JSON.stringify({ ...form, price }));
              window.location.href = "/verifyForm";
            }}
            disabled={
              !form.country ||
              !form.accountType ||
              !form.platform ||
              !form.accountSize
            }
          >
            Next
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
