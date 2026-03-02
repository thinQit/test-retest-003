import React from 'react';

interface HeroContent {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaUrl?: string;
  imageUrl?: string;
}

export default function Hero({ content }: { content: HeroContent | null }) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16 lg:flex-row lg:items-center">
      <div className="flex-1 space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Welcome</p>
        <h1 className="text-4xl font-bold sm:text-5xl">
          {content?.title ?? 'Build a delightful customer experience'}
        </h1>
        <p className="text-lg text-secondary">
          {content?.subtitle ?? 'Launch, measure, and improve your digital presence with clarity.'}
        </p>
        <div>
          <a
            href={content?.ctaUrl ?? '#contact'}
            className="inline-flex items-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            {content?.ctaText ?? 'Get started'}
          </a>
        </div>
      </div>
      <div className="flex-1">
        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-muted">
          {content?.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={content.imageUrl} alt="Hero" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Product preview
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
