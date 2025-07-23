'use client'
import React, { useState, useEffect } from 'react';
import { FaBars } from "react-icons/fa";
import ThemeToggle from "@/components/ThemeToggle";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { useTranslations } from "next-intl";
import NavigationLink from "@/components/NavigationLink";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const t = useTranslations();

    // Listen for scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`flex justify-between sticky top-0 items-center px-6 py-4 border-b dark:border-gray-700 transition backdrop-blur-lg ${
                isScrolled ? "bg-white/30 dark:bg-gray-900/30" : "bg-transparent"
            }`}
        >
            <Link href="/" className={'flex'}>
                <Image src={'/synt.png'} className={'w-[100px]'} width={1000} height={800} alt={'logo'} />
                <h1 className="text-2xl flex items-center ">{t('LocaleLayout.title')}</h1>
            </Link>
            <nav className="hidden md:flex gap-6 items-center">
                <Link href="#courses" className="py-2 hover:text-purple-500 duration-500" onClick={() => setMenuOpen(false)}>{t('nav.courses')}</Link>
                <Link href="#why-us" className="py-2 hover:text-purple-500 duration-500" onClick={() => setMenuOpen(false)}>{t('nav.why')}</Link>
                <Link href="#testimonials" className="py-2 hover:text-purple-500 duration-500" onClick={() => setMenuOpen(false)}>{t('nav.testimonials')}</Link>
                <Link href="#contact" className="py-2 hover:text-purple-500 duration-500" onClick={() => setMenuOpen(false)}>{t('nav.contact')}</Link>
                <LocaleSwitcher />
                <ThemeToggle />
            </nav>
            <div className="md:hidden flex items-center gap-4">
                <button onClick={() => setMenuOpen(!menuOpen)}><FaBars /></button>
                <ThemeToggle />
            </div>
            {menuOpen && (
                <div
                    className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border-t dark:border-gray-700 md:hidden flex flex-col px-6 py-4">
                    <NavigationLink href="#courses" className="py-2" onClick={() => setMenuOpen(false)}>{t('nav.courses')}</NavigationLink>
                    <NavigationLink href="#why-us" className="py-2" onClick={() => setMenuOpen(false)}>{t('nav.why')}</NavigationLink>
                    <NavigationLink href="#testimonials" className="py-2" onClick={() => setMenuOpen(false)}>{t('nav.testimonials')}</NavigationLink>
                    <NavigationLink href="#contact" className="py-2" onClick={() => setMenuOpen(false)}>{t('nav.contact')}</NavigationLink>
                    <div className="py-2">
                        <LocaleSwitcher />
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
