'use client';
import React, { useEffect, useState } from 'react';

type Toast = { id: number; message: string };

export default function GlobalToaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handler = (e: any) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message: e.detail || 'Error' }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    };
    window.addEventListener('api-error', handler as any);
    return () => window.removeEventListener('api-error', handler as any);
  }, []);

  if (!toasts.length) return null;

  return (
    <div className="fixed z-[2000] bottom-4 right-4 flex flex-col gap-2">
      {toasts.map((t) => (
        <div key={t.id} className="px-4 py-3 rounded-lg shadow-lg bg-red-600 text-white max-w-xs">
          {t.message}
        </div>
      ))}
    </div>
  );
}
