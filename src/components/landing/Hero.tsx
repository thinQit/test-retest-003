interface HeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  imageUrl?: string;
}

export default function Hero({ content }: { content: HeroContent | null }) {
  const title = content?.title ?? 'Welcome to our platform';
  const subtitle = content?.subtitle ?? 'We help teams launch faster with a modern experience.';
  const ctaText = content?.ctaText ?? 'Get Started';
  const ctaUrl = content?.ctaUrl ?? '#contact';

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-16 text-center">
      <h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>
      <p className="text-lg text-secondary">{subtitle}</p>
      <div>
        <a
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          href={ctaUrl}
        >
          {ctaText}
        </a>
      </div>
    </section>
  );
}
