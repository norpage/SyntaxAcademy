import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {getToken} from 'next-auth/jwt';

import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

// next-intl middleware (պահպանում ենք քոնը)
const intlMiddleware = createMiddleware(routing);

// Որ էջերը համարենք auth pages
const AUTH_PAGES = new Set([
  'login',
  'register',
  'verify',
  'reset-request',
  'reset-password'
]);

// Օգնական՝ կտրում է locale prefix-ը ու վերադարձնում է { locale, rest }
function stripLocale(pathname: string) {
  for (const l of routing.locales) {
    if (pathname === `/${l}` || pathname.startsWith(`/${l}/`)) {
      return { locale: l, rest: pathname.slice(l.length + 1) || '/' };
    }
  }
  return { locale: routing.defaultLocale, rest: pathname || '/' };
}

export default async function middleware(req: NextRequest) {
  // 1) թող next-intl-ը անի իր rewrite/redirect-ը
  const res = intlMiddleware(req);

  // 2) auth ստուգումներ
  const { pathname, search } = req.nextUrl;
  const { locale, rest } = stripLocale(pathname);
  const firstSeg = rest.split('/').filter(Boolean)[0] ?? '';

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Եթե authenticated է → արգելել auth էջերը
  if (token && AUTH_PAGES.has(firstSeg)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}/dashboard`;
    return NextResponse.redirect(url);
  }

  // Եթե guest է → արգելել dashboard-ը
// src/middleware.ts — where we check firstSeg === 'dashboard', դարձնելով՝
  if (!token && (firstSeg === 'dashboard' || firstSeg === 'settings')) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}/login`;
    url.searchParams.set('callbackUrl', pathname + search);
    return NextResponse.redirect(url);
  }


  // 3) եթե redirect պետք չէ՝ վերադարձնում ենք intl-ի response-ը
  return res;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
