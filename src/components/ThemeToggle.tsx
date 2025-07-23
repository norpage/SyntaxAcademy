'use client';
import { useTheme } from 'next-themes';
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {BsFillMoonStarsFill, BsFillSunFill} from "react-icons/bs";

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const t = useTranslations('ThemeToggle');

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-2xl ml-4"
            aria-label={t('toggle', { theme: theme === 'dark' ? 'light' : 'dark' })}
        >
            {theme !== 'dark' ? <BsFillSunFill className={'hover:text-purple-500 duration-500'}/> : <BsFillMoonStarsFill className={'hover:text-purple-500 duration-500'}/>}
        </button>
    );
}