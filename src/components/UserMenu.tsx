'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import type { Session } from 'next-auth';

type UserMenuProps = {
  // session.user-ից վերցնում ենք type-ը և թույլ ենք տալիս լինել null/undefined
  user: (Session['user'] & { id?: string }) | null | undefined;
};

export default function UserMenu({ user }: UserMenuProps) {
  const t = useTranslations();
  const router = useRouter();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
        <Image
          src={user?.image || '/UserAvatar.png'}
          alt={user?.name || 'User'}
          width={32}
          height={32}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-nowrap">{user?.name || t('nav.myPage')}</span>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => router.push('/profile')}
                  className={`${active ? 'bg-gray-100 dark:bg-gray-800' : ''} w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                >
                  {t('nav.myPage', { defaultValue: 'Profile' })}
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => signOut()}
                  className={`${active ? 'bg-gray-100 dark:bg-gray-800' : ''} w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                >
                  {t('auth.signOut', { defaultValue: 'Sign out' })}
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
