import dotenv from "dotenv";
import { NextConfig } from "next";

dotenv.config();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  },
};

export default nextConfig;
