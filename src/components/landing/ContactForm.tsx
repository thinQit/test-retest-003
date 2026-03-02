'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Contact us</h2>
        {submitted ? (
          <p className="mt-3 text-secondary">Thanks! We will be in touch soon.</p>
        ) : (
          <button
            className="mt-4 rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
            onClick={() => setSubmitted(true)}
          >
            Send message
          </button>
        )}
      </div>
    </section>
  );
}
