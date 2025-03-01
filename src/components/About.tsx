'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineTrendingUp, HiOutlineUsers, HiOutlineLightBulb } from 'react-icons/hi';

export default function AboutUs() {
    return (
        <section id="Aboutus" className="py-20 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            <motion.div
                className="max-w-5xl mx-auto text-center px-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                    About <span className="text-green-600 dark:text-green-400">PropTradX</span>
                </h2>
                <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
                    At PropTradX, we empower traders by providing access to capital, allowing them to trade risk-free and 
                    keep up to <span className="font-bold text-green-600 dark:text-green-400">100% of their profits</span>. 
                    Our goal is to revolutionize proprietary trading with transparency and innovation.
                </p>
            </motion.div>

            {/* Key Features Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
                {/* Feature 1 */}
                <motion.div
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <HiOutlineTrendingUp className="text-4xl text-green-600 dark:text-green-400" />
                    <h3 className="mt-4 text-xl font-semibold">Growth Opportunities</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Scale your trading career with capital funding and profit-sharing up to 100%.
                    </p>
                </motion.div>

                {/* Feature 2 */}
                <motion.div
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <HiOutlineUsers className="text-4xl text-green-600 dark:text-green-400" />
                    <h3 className="mt-4 text-xl font-semibold">Community Driven</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Join a network of traders and gain access to exclusive resources and mentorship.
                    </p>
                </motion.div>

                {/* Feature 3 */}
                <motion.div
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                >
                    <HiOutlineLightBulb className="text-4xl text-green-600 dark:text-green-400" />
                    <h3 className="mt-4 text-xl font-semibold">Innovative Trading</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Access cutting-edge technology and analytics to optimize your trading performance.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
