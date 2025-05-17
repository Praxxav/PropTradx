"use client";
import React, { useState } from "react";
import ConfigureForm from "@/components/ConfigureForm";
import VerifyForm from "@/components/VerifyForm";
import ProgressBar from "@/components/ProgressBar";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="min-h-screen border-white bg-gradient-to-br from-gray-950 via-black to-gray-900 flex flex-col justify-start items-center py-20 px-4">
      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl mb-8"
      >
        <ProgressBar currentStep={currentStep} totalSteps={3} />
      </motion.div>

      {/* Step Content */}
      <motion.div
        layout
        className="w-full max-w-xl p-6 sm:p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all duration-500 text-white"
      >
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              <ConfigureForm onNext={handleNext} />
            </motion.div>
          )}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              <VerifyForm  />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
