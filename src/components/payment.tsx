"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const Payment = () => {
  return (
    <section
      id="Payment"
      className="w-full py-16 px-6 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto"
    >
      {/* Left Side - Text */}
      <motion.div
        className="md:w-1/2 text-left"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          Flexible Payment Options
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
          We offer a range of payment options tailored to your convenience. Choose from 
          multiple secure and hassle-free payment methods to fund your account and start trading in no time.
        </p>
      </motion.div>

      {/* Right Side - Image */}
      <motion.div
        className="md:w-1/2 flex justify-center mt-8 md:mt-0"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Image
          src="/pay1.jpg"
          alt="Payment Illustration"
          width={500}
          height={300}
          className="rounded-xl shadow-lg"
        />
      </motion.div>
    </section>
  );
};

export default Payment;
