import { ReactNode } from 'react';
import FirstSection from "@/components/FirstSection";

type Props = {
    children?: ReactNode;
    title: ReactNode;
};

export default function PageLayout({ children, title }: Props) {

    return (
        <div className="relative w-full flex grow flex-col page-layout inset-0 bg-[var(--bg)]">
            <FirstSection/>
            <div className="container w-full relative flex grow flex-col px-4">
                <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl text-[var(--text-primary)]">
                    {title}
                </h1>
                <div className="mt-6 w-full text-[var(--text-primary)] md:text-lg opacity-80">
                    {children}
                </div>
                <div className="mt-auto grid grid-cols-1 gap-4 pt-20 md:grid-cols-2 lg:gap-12"></div>
            </div>
        </div>
    );
}