'use client';

import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';

interface HeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  imageUrl?: string;
}

interface HeroProps {
  content: HeroContent | null;
  fallback?: ReactNode;
}

export default function Hero({ content, fallback }: HeroProps) {
  if (!content) {
    return (
      <section className="mx-auto flex min-h-[40vh] max-w-5xl flex-col items-center justify-center px-6 text-center">
        {fallback || (
          <>
            <h1 className="text-3xl font-bold text-slate-900">Welcome</h1>
            <p className="mt-3 text-secondary">We are preparing something great.</p>
          </>
        )}
      </section>
    );
  }

  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 py-16 text-center">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">{content.title}</h1>
        <p className="mt-4 text-lg text-secondary">{content.subtitle}</p>
      </div>
      <Button onClick={() => window.open(content.ctaUrl, '_self')}>{content.ctaText}</Button>
      {content.imageUrl ? (
        <img
          src={content.imageUrl}
          alt={content.title}
          className="w-full max-w-3xl rounded-2xl border border-slate-200"
        />
      ) : null}
    </section>
  );
}
