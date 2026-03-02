'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/landing/Hero';
import FeaturesGrid from '@/components/landing/FeaturesGrid';
import ContactForm from '@/components/landing/ContactForm';
import { api } from '@/lib/api';
import { Spinner } from '@/components/ui/Spinner';

interface HeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  imageUrl?: string;
}

interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export default function HomePage() {
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      const heroRes = await api.get<HeroContent>('/api/hero');
      const featRes = await api.get<{ features: Feature[] }>('/api/features');

      if (heroRes.error || featRes.error) {
        setError(heroRes.error || featRes.error || 'Failed to load content');
      } else {
        if (heroRes.data) setHero(heroRes.data);
        if (featRes.data?.features) setFeatures(featRes.data.features);
      }
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
        <h2 className="text-2xl font-semibold">Unable to load content</h2>
        <p className="mt-3 text-secondary">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Hero content={hero} />
      <FeaturesGrid features={features} />
      <ContactForm />
    </div>
  );
}
