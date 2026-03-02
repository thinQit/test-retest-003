interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export default function FeaturesGrid({ features }: { features: Feature[] }) {
  if (!features.length) {
    return (
      <section className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="rounded-lg border border-border bg-white p-6 text-secondary">
          No features available yet.
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-6 py-10 md:grid-cols-3">
      {features.map((feature) => (
        <div key={feature.id} className="rounded-lg border border-border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">{feature.title}</h3>
          <p className="mt-2 text-sm text-secondary">{feature.description}</p>
        </div>
      ))}
    </section>
  );
}
