import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-3 text-secondary">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-6">
        <Button>Go home</Button>
      </Link>
    </div>
  );
}
