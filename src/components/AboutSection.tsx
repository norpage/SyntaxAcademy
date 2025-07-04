'use client';
import {FaLaptopCode, FaRobot, FaServer} from 'react-icons/fa';
import {GoDot} from "react-icons/go";
import CountUp from 'react-countup';
import {useTranslations} from 'next-intl';
import {useInView} from 'react-intersection-observer';
import {ReactNode} from "react";

export default function AboutSection() {
    const t = useTranslations('About');

    return (
        <section className="w-full text-white">
            <div className="flex flex-col md:flex-row justify-evenly items-start gap-16">
                {/* Left: Services */}
                <div className="">
                    <div className='border-l-[3px]  h-[70px] flex items-center border-[var(--gradient-via-line)] pl-4'>
                        <ServiceItem icon={<FaLaptopCode size={34}/>} label={t('webDev')}/>
                    </div>
                    <GoDot className='ml-[-8px] text-[var(--gradient-via-line)]'/>
                    <div className='border-l-[3px] h-[70px] flex items-center border-[var(--gradient-via-line)] pl-4'>
                        <ServiceItem icon={<FaRobot size={34}/>} label={t('botDev')}/>
                    </div>
                    <GoDot className='ml-[-8px] text-[var(--gradient-via-line)]'/>
                    <div className='border-l-[3px] h-[70px] flex items-center border-[var(--gradient-via-line)] pl-4'>
                        <ServiceItem icon={<FaServer size={34}/>} label={t('hosting')}/>
                    </div>
                </div>

                {/* Right: About */}
                <div className="md:w-1/2 space-y-6">
                    <h2 className="text-[40px] text-[var(--about-text)] font-bold">{t('title')}</h2>
                    <p className="text-base text-[var(--about-text)] leading-relaxed">{t('description')}</p>

                    <div className="grid grid-cols-3 gap-4 text-center mt-6">
                        <Stat number={15} suffix="+" label={t('projects')}/>
                        <Stat number={95} suffix="%" label={t('satisfaction')}/>
                        <Stat number={2} suffix="+" label={t('experience')}/>
                    </div>
                </div>
            </div>

            {/* Projects heading */}
            <div className="mt-20 text-center">
                <h2 className="text-3xl font-bold">{t('projectsTitle')}</h2>
                <div className="h-10 flex justify-center">
                    <div className="w-1 h-10 bg-red-500 mt-2"/>
                </div>
            </div>
        </section>
    );
}
type ServiceItemProps = {
    icon: ReactNode;  // since it seems like you're rendering a JSX element or icon component
    label: string;
};
function ServiceItem({ icon, label }: ServiceItemProps) {
    return (
        <div className="flex items-center text-nowrap gap-4">
            <div className="text-[30px] text-[var(--about-text)]">{icon}</div>
            <span className="text-[23px] text-[var(--about-text)] font-medium">{label}</span>
        </div>
    );
}

type StatProps = {
    number: number;
    suffix?: string;  // suffix may be optional or string
    label: string;
};

function Stat({ number, suffix, label }: StatProps) {
    const { ref, inView } = useInView({ triggerOnce: true });

    return (
        <div ref={ref}>
            <p className="text-3xl font-bold text-[var(--gradient-via-line)]">
                {inView ? <CountUp start={0} end={number} duration={4} /> : '0'}
                {suffix}
            </p>
            <p className="text-base text-white mt-1">{label}</p>
        </div>
    );
}

