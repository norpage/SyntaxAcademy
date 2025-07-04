// src/components/NavigationLink.tsx
'use client';

import clsx from 'clsx';
import { useSelectedLayoutSegment, useParams } from 'next/navigation';
import { ReactNode } from 'react';
import { Link } from '@/i18n/navigation'; // custom Link component
import { UrlObject } from 'url';

interface NavigationLinkProps {
    href: string | UrlObject;
    children: ReactNode;
    className?: string;
    [key: string]: any;
}

export default function NavigationLink({
                                           href,
                                           className,
                                           children,
                                           ...rest
                                       }: NavigationLinkProps) {
    const selectedLayoutSegment = useSelectedLayoutSegment();
    const { locale } = useParams() as { locale?: string };
    const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';

    const hrefString =
        typeof href === 'string' ? href : href.pathname || '/';

    const isActive =
        pathname === hrefString ||
        (locale && `/${locale}${pathname}` === hrefString);

    return (
        <Link
            aria-current={isActive ? 'page' : undefined}
            className={clsx(
                'inline-block px-2 py-3 transition-colors',
                isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200',
                className
            )}
            href={href as any} // <- bypass type error
            {...rest}
        >
            {children}
        </Link>
    );
}
