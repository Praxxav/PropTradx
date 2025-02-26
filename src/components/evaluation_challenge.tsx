"use client"; // Ensures it's a client component

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // Use this for Next.js 13+

export const EvaluationChallenge = () => {
  const router = useRouter(); // Must be inside the function component

  return (
    <section id="Programs" className="flex flex-wrap items-center justify-between w-full py-16 px-12 dark:bg-gray-900">
      {/* Left Side - Text Content */}
      <div className="w-full md:w-1/2 px-20">
        {/* Heading */}
        <motion.h2
          className="text-4xl font-bold text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Programs
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-lg text-purple-500 mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Explore our range of funding account options.
        </motion.p>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mt-6 max-w-lg">
          Gradual progression towards funded trading through multi-step evaluations.
          Meet pre-defined profit targets and max loss criteria to unlock larger capital
          and greater earning potential.
        </p>

        {/* Button with Redirect */}
        <motion.button
          className="mt-6 px-6 py-2 border border-yellow-500 rounded-full 
              bg-white text-black dark:bg-black dark:text-yellow-500 
              hover:bg-gradient-to-r from-yellow-500 to-orange-600 
              hover:text-white dark:hover:text-black transition"
          whileHover={{ scale: 1.05 }}
          onClick={() => router.push("/user/signup")} // Ensure this works in Next.js
        >
          Start Your Challenge
        </motion.button>
      </div>

      {/* Right Side - Evaluation Cards */}
      <motion.div
        className="w-full md:w-1/2 flex flex-row justify-center mt-10 md:mt-0 gap-x-10 px-11"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-4 rounded-lg shadow-md flex justify-between items-center">
            <span className="text-white font-medium">1st Evaluation</span>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">Pass</span>
          </div>
          <div className="bg-gray-300 dark:bg-gray-700 p-4 rounded-lg shadow-md flex justify-between items-center opacity-80 mt-4">
            <span className="text-gray-700 dark:text-gray-300">2nd Evaluation</span>
          </div>
          <div className="bg-gray-300 dark:bg-gray-700 p-4 rounded-lg shadow-md flex justify-between items-center opacity-80 mt-4">
            <span className="text-gray-700 dark:text-gray-300">3rd Evaluation</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default EvaluationChallenge;
