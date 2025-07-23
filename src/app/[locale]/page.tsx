import {Locale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {use} from 'react';
import Hero from "@/components/Hero";
import Courses from "@/components/Courses";
import WhyChooseUs from "@/components/WhyChooseUs";
import Reports from "@/components/Reports";

type Props = {
    params: Promise<{ locale: Locale }>;
};

export default function IndexPage({params}: Props) {
    const {locale} = use(params);

    setRequestLocale(locale);


    return (
       <>
           <Hero/>
           <Courses/>
           <WhyChooseUs/>
           <Reports/>
       </>
    );
}