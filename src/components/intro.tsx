'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import { HiOutlineLightningBolt, HiOutlineUser } from 'react-icons/hi';
import { useSectionInView } from '@/lib/hooks/newhoook';
import { HiOutlineChartBar, HiOutlineBookOpen } from 'react-icons/hi';
import Image from 'next/image';



export default function Intro() {
    const { ref } = useSectionInView("overview", 0.5);
    return (
        <section ref={ref} id='overview' className='sticky left-0 right-0 w-full py-20 px-6 bg-gray-50 dark:bg-gray-900 text-center'>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className='text-4xl sm:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white'>
                Master the Markets, <br /> Keep <span className='text-green-600 dark:text-green-400'>100% of Your Profits!</span>
                </h1>
                <p className='mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300'>
                    Leverage our world-class trading platform to test your trading strategy with simulated funds, 
                    collect points, and earn rewards.
                </p>
                
                <motion.div
                    className='mt-8 flex flex-col mx-auto sm:flex-row items-center justify-center gap-4'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Link
                        href='/user/signup'
                        className='group bg-gradient-to-r text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 shadow-md hover:scale-110 hover:bg-gradient-to-r from-yellow-500 to-orange-600 active:scale-105 transition'
                    >
                        Start Your Challenge <BsArrowRight className='opacity-80 group-hover:translate-x-2 transition' />
                    </Link>

                    <Link
                        href='/dashboard'
                        className='group bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer border border-gray-300 dark:border-gray-700 shadow-md'
                    >
                       Explore Dashboard <HiOutlineLightningBolt className='text-yellow-500 group-hover:scale-125 transition' />
                    </Link>
                     <Link
                          href='/user/signup'
                         className='group bg-blue-600 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 shadow-md hover:scale-110 hover:bg-blue-700 active:scale-105 transition'>
                         <HiOutlineUser className='text-white text-xl group-hover:scale-125 transition' />
                         Login
                     </Link>
                </motion.div>
            </motion.div>
             {/* Trading Overview Section */}
             <section className="mt-16 max-w-6xl mx-auto text-left">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <motion.h2
                            className="text-4xl sm:text-5xl font-bold text-gray-900 mx-auto dark:text-white leading-tight"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Simplify your trading journey
                        </motion.h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                            We’ve designed a platform that allows you to focus on what truly matters – trading. 
                            No more complicated conditions.
                        </p>

                        {/* Features */}
                        <div className="mt-8 space-y-6">
                            <div className="bg-gradient-to-r from-yellow-500 to-orange-600 dark:bg-yellow-100 p-5 rounded-lg border-l-4 border-yellow-500 shadow-md">
                                <h3 className="flex items-center gap-2 text-lg font-semibold text-black dark:text-white">
                                    <HiOutlineChartBar className="text-2xl" />
                                    Advanced Analytics
                                </h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">
                                    Gain deeper insights into your trading performance. Access comprehensive data 
                                    and metrics to track your progress, identify trends, and optimize your strategy.
                                </p>
                            </div>

                            <div>
                                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                                    <HiOutlineLightningBolt className="text-yellow-500 text-2xl" />
                                    Build-A-Challenge
                                </h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">
                                    Create your own unique challenge to suit your trading style and budget, with a 
                                    range of balances, drawdowns, evaluations, and pricing to fit your goals.
                                </p>
                            </div>

                            <div>
                                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                                    <HiOutlineBookOpen className="text-blue-500 text-2xl" />
                                    Trading Education
                                </h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">
                                    Expand your knowledge and skills with our comprehensive learning resources, 
                                    covering everything from beginner basics to advanced strategies.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <Image
                            src="/analytics.jpg"
                            alt="Trading Dashboard"
                            className="rounded-lg shadow-lg"
                            width={600}
                            height={400}
                        />
                    </motion.div>
                </div>
            </section>
        </section>
    );
}
