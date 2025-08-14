'use client';

import * as React from 'react';
import {Disclosure, Transition} from '@headlessui/react';

type AccordionProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
};

function Chevron({open}: {open: boolean}) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`h-5 w-5 transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`}
    >
      <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Accordion({title, children, defaultOpen = false, className = ''}: AccordionProps) {
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({open}) => (
        <div
          className={`rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-black/30 backdrop-blur-sm shadow-sm ${className}`}
        >
          <Disclosure.Button
            className={`w-full px-5 py-4 flex items-center justify-between text-left transition
                        ${open ? 'bg-gray-50 dark:bg-gray-900/50' : ''}`}
          >
            <span className="font-semibold">{title}</span>
            <Chevron open={open}/>
          </Disclosure.Button>

          <Transition
            enter="transition transform ease-out duration-200"
            enterFrom="opacity-0 -translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition transform ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-1"
          >
            <Disclosure.Panel className="px-5 pb-5 pt-2">
              {children}
            </Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  );
}
