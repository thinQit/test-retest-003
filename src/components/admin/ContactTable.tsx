'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Spinner } from '@/components/ui/Spinner';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function ContactTable() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      const res = await api.get<{ messages: ContactMessage[] }>('/api/contact');
      if (res.error) {
        setError(res.error);
      } else if (res.data?.messages) {
        setMessages(res.data.messages);
      }
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner className="h-6 w-6" />
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  if (!messages.length) {
    return <p className="text-sm text-secondary">No contact submissions yet.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Message</th>
            <th className="px-4 py-3">Received</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {messages.map((message) => (
            <tr key={message.id} className="bg-white">
              <td className="px-4 py-3 font-medium text-slate-900">{message.name}</td>
              <td className="px-4 py-3 text-slate-700">{message.email}</td>
              <td className="px-4 py-3 text-slate-700">{message.message}</td>
              <td className="px-4 py-3 text-slate-500">
                {new Date(message.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
