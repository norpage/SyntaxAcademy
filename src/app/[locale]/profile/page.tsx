'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const user = session?.user;

    // եթե login չի արած, տանում ենք login page
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    // if (status !== 'loading') {
    //     return (
    //         <div className="flex justify-center items-center min-h-screen">
    //             <Loader/>
    //         </div>
    //     );
    // }

    return (
        <main className="max-w-2xl mx-auto py-10 px-6">
            <h1 className="text-3xl font-bold mb-6">My Profile</h1>

            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 flex flex-col items-center gap-4">
                <Image
                    src={user?.image || '/UserAvatar.png'}
                    alt={user?.name || 'User Avatar'}
                    width={100}
                    height={100}
                    className="rounded-full object-cover"
                />
                <h2 className="text-xl font-semibold">{user?.name || 'No name'}</h2>
                <p className="text-gray-500">{user?.email}</p>

                {/* Այստեղ կարող ենք ավելացնել ավելին, օրինակ՝ settings, password change */}
                <div className="mt-6 w-full">
                    <button
                        onClick={() => router.push('/settings')}
                        className="w-full py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition"
                    >
                        Account Settings
                    </button>
                </div>
            </div>
        </main>
    );
}
