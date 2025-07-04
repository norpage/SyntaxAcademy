import { notFound } from 'next/navigation';
import { Locale, hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';
import { clsx } from 'clsx';
import { Inter } from 'next/font/google';
import { routing } from '@/i18n/routing';
// import Navigation from '@/components/Navigation';
import './styles.css';
import {Providers} from "@/app/providers";
import SyntaxSoon from "@/components/SyntaxSoon";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Omit<Props, 'children'>) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'LocaleLayout' });
  return {
    title: t('title'),
  };
}

export default async function LocaleLayout({
                                               // children,
                                               params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
      <html className="h-full" lang={locale} suppressHydrationWarning>
      <body className={clsx(inter.className, 'flex h-full flex-col bg-[var(--bg)]')}>
      <Providers>
        <NextIntlClientProvider>
          {/*<Navigation />*/}
          {/*{children}*/}
            <SyntaxSoon/>
        </NextIntlClientProvider>
      </Providers>
      </body>
      </html>
  );
}