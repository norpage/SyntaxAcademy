import {Locale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {use} from 'react';
import PageLayout from '@/components/PageLayout';
import AboutSection from "@/components/AboutSection";

type Props = {
    params: Promise<{ locale: Locale }>;
};

export default function IndexPage({params}: Props) {
    const {locale} = use(params);

    setRequestLocale(locale);


    return (
        <PageLayout title={' '}>
            <AboutSection/>
        </PageLayout>
    );
}