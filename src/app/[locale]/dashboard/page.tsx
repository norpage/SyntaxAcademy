'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import api from '@/config/axios';
import { API_URLS } from '@/config/urls';

type Profile = {
    bio: string;
    _id: string;
    name: string;
    email: string;
    age?: number;
    image?: string | null;
};

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = (session as any)?.accessToken;
        if (!token) return; // չկանչել, մինչև accessToken-ը հասու չի

        setLoading(true);
        api
          .get(API_URLS.me) // Authorization header-ը axios interceptor-ն արդեն ավելացնում է
          .then(({ data }) => {
              if (data?.status === 'success') setProfile(data.user);
          })
          .catch(console.error)
          .finally(() => setLoading(false));
    }, [session]);

    // if (status === 'loading') return <Loader />;
    if (status === 'unauthenticated') return null;

    return (
      <main className="max-w-3xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

          {loading && <p>Loading profile…</p>}

          {profile && (
            <div className="space-y-2">
                <p><b>Name:</b> {profile.name}</p>
                <p><b>Email:</b> {profile.email}</p>
              {profile.age != null && <p><b>Age:</b> {profile.age}</p>}
              <p><b>Bio:</b> {profile.bio}</p>
            </div>
          )}
      </main>
    );
}
