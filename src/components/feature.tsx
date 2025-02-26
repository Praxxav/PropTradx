"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";


export const FeaturesSection = () => {
  return (
    <section id="features" className="w-full py-16 px-6 bg-gray-50 dark:bg-gray-900 text-center">
      {/* Title Section */}
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
        Our Features
      </h2>
      <p className="text-purple-500 mt-2">
        Still have questions? <span className="underline">Find your answers below.</span>
      </p>

      {/* Features Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Card 1 - Lightning-Fast Payouts with Earnings Stack */}
        <motion.div
          className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-md text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Lightning-Fast Payouts
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-3">
            Get your funds fast with PropTradeX lightning-fast payout system.
            Requests processed within 24 hours for quick access to your profits.
          </p>

          {/* Earnings Stack UI */}
          <div className="relative mt-6 p-6 rounded-3xl bg-white dark:bg-gray-700 shadow-xl mx-auto max-w-xs">
            <div className="relative space-y-4">
              {[
                { amount: "$550", opacity: "opacity-60" },
                { amount: "$9000", opacity: "opacity-80" },
                { amount: "$2000", opacity: "opacity-100", highlight: true },
                { amount: "$2500", opacity: "opacity-80" },
                { amount: "$100", opacity: "opacity-60" },
              ].map(({ amount, opacity, highlight }, index) => (
                <motion.div
                  key={index}
                  className={`relative mx-auto w-60 p-4 rounded-xl shadow-md backdrop-blur-md ${opacity} ${
                    highlight
                      ? "bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold shadow-lg scale-110"
                      : "bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <p className="text-center">
                    {highlight ? `You earned ${amount}` : `You earned ${amount}`}
                  </p>
                  {highlight && <p className="text-xs text-white text-center">Payout Approved</p>}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      {/* Card 2 - Optimal Trading Conditions */}
<motion.div
  className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-md text-center flex flex-col h-full"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.2 }}
>
  {/* Image at the top */}
  <Image src="/neural.jpg" alt="Neura" width={500} height={300} className="w-full h-100 object-cover rounded-lg mt-12" />


  {/* Push content to the bottom */}
  <div className="flex-grow"></div>

  {/* Text at the bottom */}
  <div className="mt-auto">
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
      Optimal Trading Conditions
    </h3>
    <p className="text-gray-600 dark:text-gray-300 mt-3">
      Trade with an edge on ProptradeX platform. Benefit from raw spreads and
      low $4 commissions, optimizing your strategy for maximum profitability.
    </p>
  </div>
</motion.div>

      </div>
    </section>
  );
};

export default FeaturesSection;