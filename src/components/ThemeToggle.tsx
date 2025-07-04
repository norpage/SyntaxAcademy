'use client';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTranslations } from 'next-intl';

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const t = useTranslations('ThemeToggle');

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-[10px] rounded-md bg-[var(--nav-bg)] text-[var(--header-text)] hover:bg-opacity-80 transition"
            aria-label={t('toggle', { theme: theme === 'dark' ? 'light' : 'dark' })}
        >
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
    );
}