import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function ThankYouPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 text-center">
      <h1 className="text-3xl font-bold">Thank you for reaching out!</h1>
      <p className="mt-4 text-secondary">We received your message and will get back to you soon.</p>
      <div className="mt-8 flex justify-center">
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </section>
  );
}
