"use client";
import { faqs } from "@/lib/data/data";
import { useState } from "react";
import { motion } from "framer-motion";

export const FAQSection = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleFAQ = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="FAQ" className="w-full py-16 px-6 bg-gray-50 dark:bg-gray-900 text-center">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
      <p className="text-purple-500 mt-2">Find answers to common questions below.</p>

      <div className="mt-12 max-w-4xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{faq.question}</h3>
              <span className="text-gray-500 dark:text-gray-400 text-xl">
                {openIndices.includes(index) ? "−" : "+"}
              </span>
            </div>
            {openIndices.includes(index) && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="mt-3 text-gray-600 dark:text-gray-300"
              >
                {faq.answer}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
