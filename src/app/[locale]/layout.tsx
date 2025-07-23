import {notFound} from 'next/navigation';
import {Locale, hasLocale, NextIntlClientProvider} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {ReactNode} from 'react';
import {routing} from '@/i18n/routing';
import './styles.css';
import {Providers} from "@/app/providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Props = {
    children: ReactNode;
    params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata(props: Omit<Props, 'children'>) {
    const {locale} = await props.params;
    const t = await getTranslations({locale, namespace: 'LocaleLayout'});
    return {
        title: t('title'),
    };
}

export default async function LocaleLayout({
                                               children,
                                               params
                                           }: Props) {
    const {locale} = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);

    return (
        <html className="h-full" lang={locale} suppressHydrationWarning>
        <body className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white font-mono">
        <Providers>
            <NextIntlClientProvider>
                <Header/>
                {children}
                <Footer/>
            </NextIntlClientProvider>
        </Providers>
        </body>
        </html>
    );
}