'use client';

import {ThemeProvider} from 'next-themes';
import {SessionProvider} from 'next-auth/react';
import GlobalToaster from '@/components/GlobalToaster';
import AuthTokenBridge from '@/components/AuthTokenBridge';
import {ReactNode} from 'react';
import AuthLoadingOverlay from '@/components/AuthLoadingOverlay';

export function Providers({children}: {children: ReactNode}) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
        {children}
        <AuthTokenBridge />
        <GlobalToaster />
        <AuthLoadingOverlay />
      </ThemeProvider>
    </SessionProvider>
  );
}
