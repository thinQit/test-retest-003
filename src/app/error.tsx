'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <h2 className="text-2xl font-semibold">Something went wrong</h2>
      <p className="mt-3 text-secondary">Please try again.</p>
      <Button className="mt-6" onClick={reset}>
        Retry
      </Button>
    </div>
  );
}
