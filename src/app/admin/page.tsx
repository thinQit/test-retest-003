'use client';

import ContactTable from '@/components/admin/ContactTable';

export default function AdminPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-2 text-secondary">View and manage contact submissions.</p>
      <div className="mt-8">
        <ContactTable />
      </div>
    </section>
  );
}
