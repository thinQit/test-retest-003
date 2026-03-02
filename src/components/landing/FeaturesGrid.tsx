'use client';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

interface FeaturesGridProps {
  features: Feature[];
}

export default function FeaturesGrid({ features }: FeaturesGridProps) {
  if (!features.length) {
    return (
      <section className="mx-auto max-w-5xl px-6 py-12 text-center">
        <h2 className="text-2xl font-semibold">Features coming soon</h2>
        <p className="mt-2 text-secondary">We are putting the final touches together.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <div key={feature.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-2xl">{feature.icon ? feature.icon : '✨'}</div>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">{feature.title}</h3>
            <p className="mt-2 text-sm text-secondary">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
