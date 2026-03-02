'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/providers/ToastProvider';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export function ContactTable() {
  const { notify } = useToast();
  const [token, setToken] = useState('');
  const [search, setSearch] = useState('');
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [loading, setLoading] = useState(false);

  const headers = useMemo(() => ({
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : ''
  }), [token]);

  const load = async () => {
    if (!token) return;
    setLoading(true);
    const res = await fetch(`/api/contact?search=${encodeURIComponent(search)}`, { headers });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      notify(data.error || 'Failed to load messages', 'error');
      return;
    }
    setItems(data.items || []);
  };

  useEffect(() => {
    const stored = localStorage.getItem('adminToken');
    if (stored) setToken(stored);
  }, []);

  useEffect(() => {
    if (token) localStorage.setItem('adminToken', token);
  }, [token]);

  useEffect(() => {
    load();
  }, [token, search]);

  const onDelete = async (id: string) => {
    const res = await fetch(`/api/contact/${id}`, { method: 'DELETE', headers });
    const data = await res.json();
    if (!res.ok) {
      notify(data.error || 'Failed to delete', 'error');
      return;
    }
    notify('Message deleted', 'success');
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Admin Token"
          value={token}
          onChange={e => setToken(e.target.value)}
          helperText="Enter ADMIN_TOKEN to access messages"
        />
        <Input
          label="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          helperText="Filter by name, email, or message"
        />
      </div>

      {loading && <p className="text-secondary">Loading...</p>}

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="min-w-full text-sm">
          <thead className="bg-muted text-left">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-t border-border">
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.email}</td>
                <td className="px-4 py-3">{item.message.slice(0, 50)}...</td>
                <td className="px-4 py-3">{new Date(item.createdAt).toLocaleString()}</td>
                <td className="px-4 py-3 space-x-2">
                  <Button size="sm" variant="outline" onClick={() => setSelected(item)}>View</Button>
                  <Button size="sm" variant="destructive" onClick={() => onDelete(item.id)}>Delete</Button>
                </td>
              </tr>
            ))}
            {!items.length && (
              <tr>
                <td className="px-4 py-6 text-center text-secondary" colSpan={5}>
                  No messages yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Message Details">
        {selected && (
          <div className="space-y-2">
            <p><span className="font-semibold">Name:</span> {selected.name}</p>
            <p><span className="font-semibold">Email:</span> {selected.email}</p>
            <p><span className="font-semibold">Message:</span> {selected.message}</p>
            <p><span className="font-semibold">Created:</span> {new Date(selected.createdAt).toLocaleString()}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ContactTable;
