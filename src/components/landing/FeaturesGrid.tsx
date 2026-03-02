interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export default function FeaturesGrid({ features }: { features: Feature[] }) {
  if (!features.length) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-12 text-center text-secondary">
        Features will appear here once they are configured.
      </section>
    );
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-6 py-12 md:grid-cols-3">
      {features.map((feature) => (
        <div key={feature.id} className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold">{feature.title}</h3>
          <p className="mt-2 text-sm text-secondary">{feature.description}</p>
        </div>
      ))}
    </section>
  );
}
