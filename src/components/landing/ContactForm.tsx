'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    const res = await api.post('/api/contact', { name, email, message });
    if (res.error) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-12">
      <h2 className="text-2xl font-semibold text-slate-900">Contact us</h2>
      <p className="mt-2 text-secondary">We will get back to you within 24 hours.</p>
      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <input
          className="w-full rounded-md border border-slate-200 px-4 py-2"
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <input
          className="w-full rounded-md border border-slate-200 px-4 py-2"
          placeholder="Email address"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <textarea
          className="min-h-[120px] w-full rounded-md border border-slate-200 px-4 py-2"
          placeholder="How can we help?"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending...' : 'Send message'}
          </Button>
          {status === 'success' ? (
            <span className="text-sm text-emerald-600">Message sent!</span>
          ) : null}
          {status === 'error' ? (
            <span className="text-sm text-red-500">Something went wrong.</span>
          ) : null}
        </div>
      </form>
    </section>
  );
}
