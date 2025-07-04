'use client';
import React from 'react';
import Image from "next/image";

const FirstSection = () => {
    return (
        <section className="relative text-[var(--text-primary)] pt-[70px]  top-[-60px] bg-gradient-to-r from-[var(--gradient-from)] via-[var(--gradient-via)] transition-colors duration-300">
            <div className="mx-auto relative">
                <div className="flex flex-col md:flex-row items-center justify-around">
                    <div className="text-center md:text-left pl-10 mb-8">
                        <h1 className="font-bold text-xl mb-2">
                            Hello <span className='text-[var(--gradient-via-line)] text-[38px]'>.</span>
                        </h1>
                        <h2 className="relative ml-8 text-2xl mb-2">
                            I’m David
                            <hr className="absolute border-[var(--gradient-via-line)] top-3/4 left-[-230px] w-[220px]" />
                        </h2>
                        <h3 className="text-4xl font-bold mb-6">Software Developer</h3>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <button className="bg-[var(--gradient-via-line)] text-white px-6 py-2 rounded hover:opacity-90 transition">
                                Got a project?
                            </button>
                            <button className="bg-[var(--nav-bg)] text-[var(--nav-text)] px-6 py-2 rounded hover:opacity-90 transition">
                                My resume
                            </button>
                        </div>
                    </div>

                    <div className="relative mr-44">
                        <div
                            className="absolute w-[500px] h-[500px] top-[65px] left-[-50px] z-10 rounded-full flex justify-center items-center"
                            style={{
                                backgroundImage:
                                    'linear-gradient(67.2deg, rgba(250,143,78,1) -0.5%, rgba(247,171,94,1) 38.3%, rgba(240,228,99,1) 98.5%)',
                                boxShadow:
                                    'rgba(255, 30, 0, 0.25) 0px 54px 55px, rgb(149 149 149 / 12%) 116px -29px 100px, rgb(255 113 90) -5px -60px 148px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgb(214 214 214) 3px -18px 47px'
                            }}
                        >
                            <div
                                className="w-[450px] h-[450px] left-[-50px] z-10 rounded-full  duration-700 bg-[var(--gradient-via-o)]"

                            ></div>
                        </div>

                        <Image
                            src="/me.png"
                            width={1000}
                            height={800}
                            alt="David"
                            className="relative z-20 w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            <div className="relative z-30 w-full h-[70px] bg-[var(--nav-bg)] text-[var(--nav-text)] flex items-center justify-evenly transition-colors duration-300">
                <span>HTML5</span>
                <span>CSS</span>
                <span>Javascript</span>
                <span>Node.js</span>
                <span>React</span>
                <span>Git</span>
                <span>Github</span>
            </div>
        </section>
    );
};

export default FirstSection;
