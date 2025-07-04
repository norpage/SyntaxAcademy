'use client';
import {motion} from 'framer-motion';
import Image from "next/image";
import React from "react";

export default function SyntaxSoon() {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#677893] to-[#0f172a] text-white overflow-hidden px-6">
            <div className="max-w-4xl text-center flex flex-col items-center justify-center space-y-6">
                <Image
                    src="/synt_png.png"
                    width={1000}
                    height={800}
                    alt="Logo"
                    className="relative z-20 w-1/3 h-auto object-cover"
                />
                <motion.h1
                    initial={{opacity: 0, y: -30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                    className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight"
                >
                    Learn to Code, Fast & Smart
                </motion.h1>

                <motion.p
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.3, duration: 0.6}}
                    className="text-lg md:text-xl text-gray-300"
                >
                    Join Syntax Academy and unlock the fastest way to become a software developer.
                </motion.p>

                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.5, duration: 0.6}}
                    className="flex flex-col md:flex-row gap-4 justify-center"
                >
                   <div className='text-[25px] font-extrabold'>Soon...</div>
                </motion.div>
            </div>
        </section>
    );
}
