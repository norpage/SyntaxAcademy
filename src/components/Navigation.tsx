// src/components/Navigation.tsx
'use client';

import { useTranslations } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';
import NavigationLink from './NavigationLink';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const t = useTranslations('Navigation');

  return (
      <header className="inset-0 sticky top-0 z-50">
        <nav className="container flex justify-between items-center p-2 max-w-[55rem]">
          <div className="font-sans text-[16px] font-bold text-[var(--text-primary)]">{t('myName')}</div>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-4 text-[15px] font-[100] mr-6 text-[var(--text-primary)]">
              <NavigationLink href="/" className="hover:text-[var(--button-bg)]">{t('home')}</NavigationLink>
              <NavigationLink href="/about" className="hover:text-[var(--button-bg)]">{t('about')}</NavigationLink>
              <NavigationLink href="/projects" className="hover:text-[var(--button-bg)]">{t('projects')}</NavigationLink>
              <NavigationLink href="/contacts" className="hover:text-[var(--button-bg)]">{t('contacts')}</NavigationLink>
            </div>
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </nav>
      </header>
  );
}