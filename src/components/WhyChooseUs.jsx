import React from 'react';
import PageLayout from "@/components/PageLayout";
import {useTranslations} from "next-intl";
import {FaCheckCircle} from "react-icons/fa";

const WhyChooseUs = () => {
    const t = useTranslations();
    const whyPointsKeys = [
        "why.points.0",
        "why.points.1",
        "why.points.2"
    ];

    return (
        <PageLayout title={t('nav.why')} id="why-us" className="py-16 px-4">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
                {whyPointsKeys.map((key, i) => (
                    <div key={i} className="flex items-start gap-4">
                        <FaCheckCircle className="text-purple-500 text-xl"/>
                        <p>{t(key)}</p>
                    </div>
                ))}
            </div>
        </PageLayout>
    );
};

export default WhyChooseUs;