"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const footerLinks = [
  { label: "Overview", href: "/" },
  { label: "Programs", href: "#Programs" },
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#faq" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "" },
];

const Footer = () => {
  const router = useRouter();

  return (
    <footer className="w-full py-12 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold shadow-lg scale-110">
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6"
      >
        {/* Left Side - Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="text-center md:text-left max-w-xl"
        >
          <h2 className="text-4xl font-bold">Get Started Today!</h2>
          <p className="mt-3 text-lg">
            Join over <span className="font-semibold">10,000+ traders</span> who have taken their trading to the next level.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
            onClick={() => router.push("/user/signup")}
          >
            Start Your Challenge →
          </motion.button>
        </motion.div>

        {/* Right Side - Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          className="mt-8 md:mt-0"
        >
          <Image src="/mob.png" alt="Trading Dashboard" width={320} height={320} />
        </motion.div>
      </motion.div>

      {/* Footer Links */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 },
          },
        }}
        className="border-t mt-10 pt-6"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-white text-sm">
          {footerLinks.map((link, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={link.href} className="hover:text-gray-300">
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
