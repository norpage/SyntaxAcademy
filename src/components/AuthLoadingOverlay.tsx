'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Loader from '@/components/Loader';

export default function AuthLoadingOverlay() {
  const { status } = useSession();
  // Փոքր ուշացում, որ չփայլփլա արագ state փոփոխություններից
  const [show, setShow] = useState(false);

  useEffect(() => {
    let t: any;
    if (status === 'loading') {
      t = setTimeout(() => setShow(true), 120); // 120ms debounce
    } else {
      setShow(false);
    }
    return () => clearTimeout(t);
  }, [status]);

  if (!show) return null;

  return (<Loader />);
}
