import React from 'react';
import PageLayout from "@/components/PageLayout";
import {useTranslations} from "next-intl";

const Reports = () => {
    const testimonialsData = [
        {name: "Anna G.", quoteKey: "testimonials.items.0.quote"},
        {name: "Karen A.", quoteKey: "testimonials.items.1.quote"},
    ];


    const t = useTranslations()
    return (
        <PageLayout title={t('testimonials.title')} id="testimonials" className="py-16 px-4 bg-gray-100 dark:bg-gray-800">
            <div className="max-w-4xl mx-auto space-y-8">
                {testimonialsData.map(({name, quoteKey}, i) => (
                        <div key={i}
                             className="bg-white dark:bg-gray-900 border dark:border-gray-700 p-6 rounded-lg shadow">
                            <p className="italic mb-2">“{t(quoteKey)}”
                            </p>
                            <p className="font-semibold text-right">- {name}</p>
                        </div>
                    )
                )}
            </div>
        </PageLayout>
    )
        ;
};

export default Reports;