interface HeroContent {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaUrl?: string;
  imageUrl?: string;
}

export default function Hero({ content }: { content: HeroContent | null }) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-16 text-center">
      <h1 className="text-4xl font-bold">{content?.title ?? 'Welcome to our platform'}</h1>
      <p className="text-secondary">{content?.subtitle ?? 'Build something great with us.'}</p>
      {content?.ctaText && content?.ctaUrl ? (
        <a
          className="mx-auto inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
          href={content.ctaUrl}
        >
          {content.ctaText}
        </a>
      ) : null}
    </section>
  );
}
