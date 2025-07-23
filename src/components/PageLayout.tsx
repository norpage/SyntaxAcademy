import { ReactNode } from 'react';

type Props = {
    children?: ReactNode;
    id:string;
    title: ReactNode;
    className: string;
};

export default function PageLayout({ children,id, title,className }: Props) {

    return (
        <section id={id} className={className}>
            <h3 className="text-3xl font-bold text-center mb-10">
                {title}
            </h3>
            {children}
        </section>
    );
}