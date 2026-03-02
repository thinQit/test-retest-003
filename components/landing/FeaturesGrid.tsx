import React from 'react';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export default function FeaturesGrid({ features }: { features: Feature[] }) {
  const list = features.length
    ? features
    : [
        {
          id: 'feature-1',
          title: 'Fast setup',
          description: 'Configure your experience in minutes with sensible defaults.',
        },
        {
          id: 'feature-2',
          title: 'Insightful analytics',
          description: 'Track engagement across your channels with real-time data.',
        },
        {
          id: 'feature-3',
          title: 'Secure by design',
          description: 'Industry-standard security keeps your data protected.',
        },
      ];

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12">
      <h2 className="text-2xl font-semibold">Highlights</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((feature) => (
          <article key={feature.id} className="rounded-2xl border border-border p-6">
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="mt-2 text-sm text-secondary">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
