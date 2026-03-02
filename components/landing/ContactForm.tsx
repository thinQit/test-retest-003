import React from 'react';

export default function ContactForm() {
  return (
    <section id="contact" className="mx-auto w-full max-w-4xl px-6 py-12">
      <div className="rounded-2xl border border-border p-8">
        <h2 className="text-2xl font-semibold">Contact us</h2>
        <p className="mt-2 text-secondary">We will get back to you within 24 hours.</p>
        <form className="mt-6 grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
              placeholder="Jane Doe"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
              placeholder="jane@example.com"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
              placeholder="Tell us about your project..."
            />
          </div>
          <button
            type="submit"
            className="inline-flex w-fit items-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}
