export default function ContactForm() {
  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-12">
      <div className="rounded-lg border p-6">
        <h2 className="text-2xl font-semibold">Get in touch</h2>
        <p className="mt-2 text-sm text-secondary">
          Send us a message and we will get back to you soon.
        </p>
        <form className="mt-6 grid gap-4">
          <input
            className="w-full rounded-md border px-3 py-2 text-sm"
            type="text"
            name="name"
            placeholder="Your name"
          />
          <input
            className="w-full rounded-md border px-3 py-2 text-sm"
            type="email"
            name="email"
            placeholder="Your email"
          />
          <textarea
            className="min-h-[120px] w-full rounded-md border px-3 py-2 text-sm"
            name="message"
            placeholder="Your message"
          />
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}
