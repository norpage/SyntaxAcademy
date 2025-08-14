'use client';

import React, { useState, useEffect } from 'react';
import { FaBars } from "react-icons/fa";
import ThemeToggle from "@/components/ThemeToggle";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { useTranslations } from "next-intl";
import NavigationLink from "@/components/NavigationLink";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import UserMenu from "@/components/UserMenu";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const t = useTranslations();
    const { data: session, status } = useSession();
    const user = session?.user;

    // scroll effect
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <header
            className={`flex justify-between pr-3 z-[1000] sticky top-0 items-center border-b dark:border-gray-700 transition backdrop-blur-lg ${
                isScrolled ? "bg-white/30 dark:bg-gray-900/30" : "bg-transparent"
            }`}
        >
            {/* Logo */}
            <NavigationLink href="/" className={'flex'}>
                <Image src={'/synt.png'} className={'w-[100px]'} width={1000} height={800} alt={'logo'} />
                <h1 className="text-2xl flex items-center">{t('LocaleLayout.title')}</h1>
            </NavigationLink>

            {/* Desktop nav */}
            <nav className="hidden md:flex gap-6 items-center">
                {user && <NavigationLink href="/dashboard"
                                 onClick={() => setMenuOpen(false)}>{t('nav.dashboard')}</NavigationLink>}
                <NavigationLink href="/#courses" onClick={() => setMenuOpen(false)}>{t('nav.courses')}</NavigationLink>
                <NavigationLink href="/#why-us" onClick={() => setMenuOpen(false)}>{t('nav.why')}</NavigationLink>
                <NavigationLink href="/#testimonials" onClick={() => setMenuOpen(false)}>{t('nav.testimonials')}</NavigationLink>
                <NavigationLink href="/#contact" onClick={() => setMenuOpen(false)}>{t('nav.contact')}</NavigationLink>
                <LocaleSwitcher />
                <ThemeToggle />

                {status === "loading" ? (
                    <div className="w-28 h-9 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
                ) : user ? (
                    <UserMenu user={user} />
                ) : (
                    <button
                        onClick={() => signIn()}
                        className="px-4 py-2 text-nowrap bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow-md hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                    >
                        {t('auth.signIn')}
                    </button>
                )}
            </nav>

            {/* Mobile header */}
            <div className="md:hidden flex items-center gap-4">
                <button onClick={() => setMenuOpen(!menuOpen)}><FaBars /></button>
                <ThemeToggle />
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border-t dark:border-gray-700 md:hidden flex flex-col px-6 py-4">
                    {user &&<NavigationLink href="/dashboard"
                                     onClick={() => setMenuOpen(false)}>{t('nav.dashboard')}</NavigationLink>}
                    <NavigationLink href="/#courses" onClick={() => setMenuOpen(false)}>{t('nav.courses')}</NavigationLink>
                    <NavigationLink href="/#why-us" onClick={() => setMenuOpen(false)}>{t('nav.why')}</NavigationLink>
                    <NavigationLink href="/#testimonials" onClick={() => setMenuOpen(false)}>{t('nav.testimonials')}</NavigationLink>
                    <NavigationLink href="/#contact" onClick={() => setMenuOpen(false)}>{t('nav.contact')}</NavigationLink>
                    <div className="py-2"><LocaleSwitcher /></div>

                    {status === "loading" ? (
                        <div className="w-28 h-9 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
                    ) : user ? (
                        <UserMenu user={user} />
                    ) : (
                        <button
                            onClick={() => signIn()}
                            className="px-4 py-2 text-nowrap bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow-md hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                        >
                            {t('auth.signIn')}
                        </button>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
