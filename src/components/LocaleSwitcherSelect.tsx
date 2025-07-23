'use client';
import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { Locale } from 'next-intl';
import { ChangeEvent, ReactNode, useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
                                               children,
                                               defaultValue,
                                               label,
                                             }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(
          // @ts-expect-error -- TypeScript will validate that only known `params`
          // are used in combination with a given `pathname`. Since the two will
          // always match for the current route, we can skip runtime checks.
          { pathname, params },
          { locale: nextLocale }
      );
    });
  }

  return (
      <label
          className={clsx(
              'relative',
              isPending && 'transition-opacity [&:disabled]:opacity-30'
          )}
      >
        <p className="sr-only hover:text-purple-500 duration-500">{label}</p>
        <select
            className="p-1 rounded border dark:border-gray-600 dark:bg-gray-800 dark:text-white cursor-pointer"
            defaultValue={defaultValue}
            disabled={isPending}
            onChange={onSelectChange}
        >
          {children}
        </select>
      </label>
  );
}