"use client";
import React from "react";
import { motion } from "framer-motion";

type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      {/* Label */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-blue-400 tracking-wide uppercase">
          Step {currentStep} of {totalSteps}
        </span>
      </div>

      {/* Progress Bar Track */}
      <div className="w-full h-3 bg-gray-700/40 rounded-full overflow-hidden shadow-inner border border-gray-600">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 shadow-md"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </div>

      {/* Optional step indicators below (if needed) */}
      {/* 
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <span key={i}>Step {i + 1}</span>
        ))}
      </div>
      */}
    </div>
  );
};

export default ProgressBar;
