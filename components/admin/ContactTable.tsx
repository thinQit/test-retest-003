import React from 'react';

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
};

const demoMessages: ContactMessage[] = [];

export default function ContactTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Message</th>
          </tr>
        </thead>
        <tbody>
          {demoMessages.length === 0 ? (
            <tr>
              <td className="px-4 py-6 text-center text-muted-foreground" colSpan={3}>
                No contact submissions yet.
              </td>
            </tr>
          ) : (
            demoMessages.map((message) => (
              <tr key={message.id} className="border-t">
                <td className="px-4 py-3 font-medium">{message.name}</td>
                <td className="px-4 py-3">{message.email}</td>
                <td className="px-4 py-3">{message.message}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
