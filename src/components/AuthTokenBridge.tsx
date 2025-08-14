'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { setAuthToken } from '@/config/axios';

export default function AuthTokenBridge() {
  const { data: session } = useSession();
  useEffect(() => {
    const token = (session as any)?.accessToken || (session as any)?.user?.token || null;
    setAuthToken(token || null);
  }, [session]);
  return null;
}
