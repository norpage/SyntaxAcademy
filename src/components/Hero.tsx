'use client'
import React, { useEffect, useState } from 'react';
import { useTranslations } from "next-intl";
import NavigationLink from "@/components/NavigationLink";

const Hero = () => {
    const t = useTranslations();
    const fullText = `${t('hero.title')}`;
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            setDisplayText((prev) => prev + fullText.charAt(index));
            index++;
            if (index >= fullText.length) clearInterval(timer);
        }, 80); // typing speed (ms)

        return () => clearInterval(timer);
    }, [fullText]);

    return (
        <section className="text-center py-16 px-4 flex flex-col items-center">
      {/*<pre className="text-green-400 bg-gray-700 inline-block px-4 py-2 rounded-md">*/}
      {/*  <code></code>*/}
      {/*  <span className="animate-pulse text-yellow-300">|</span>*/}
      {/*</pre>*/}
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">{displayText}
                <span className="text-yellow-300 blinking-cursor">|</span>
            </h2>
            <NavigationLink
                href={'/register'}
                className="mt-6 max-w-[300px] px-6 py-3 text-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded hover:opacity-90 transition">
                {t('hero.start')}
            </NavigationLink>
        </section>
    );
};

export default Hero;
