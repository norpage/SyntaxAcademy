import React from 'react';
import PageLayout from "@/components/PageLayout";
import {useTranslations} from "next-intl";
import {FaCss3Alt, FaHtml5, FaJs, FaReact} from "react-icons/fa";

const coursesData = [
    {icon: <FaHtml5 className="text-orange-500 text-4xl"/>, key: "html"},
    {icon: <FaCss3Alt className="text-blue-500 text-4xl"/>, key: "css"},
    {icon: <FaJs className="text-yellow-400 text-4xl"/>, key: "js"},
    {icon: <FaReact className="text-cyan-400 text-4xl"/>, key: "react"},
];

const Hero = () => {
    const t = useTranslations();

    return (

        <PageLayout title={t('courses.title')} id="courses" className="py-16 px-4 bg-gray-100 dark:bg-gray-800">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 max-w-6xl mx-auto">
                {coursesData.map(({icon, key}) => (
                        <div
                            key={key}
                            className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg p-6 shadow hover:shadow-lg transition"
                        >
                            <div className="mb-4">{icon}</div>
                            <h4 className="text-xl font-semibold mb-2">{t(`courses.${key}.title`)}</h4>
                            <p>{t(`courses.${key}.desc`)}</p>
                        </div>

                    )
                )}
            </div>
        </PageLayout>
    );
};

export default Hero;