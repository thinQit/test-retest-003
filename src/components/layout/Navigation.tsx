'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/Button';

export function Navigation() {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="border-b border-border bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold">test-retest-003</Link>
        <button
          className="md:hidden"
          aria-label="Toggle navigation"
          onClick={() => setOpen(prev => !prev)}
        >
          ☰
        </button>
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/#features" className="text-sm text-secondary hover:text-foreground">Features</Link>
          <Link href="/#contact" className="text-sm text-secondary hover:text-foreground">Contact</Link>
          <Link href="/admin" className="text-sm text-secondary hover:text-foreground">Admin</Link>
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm">Hi, {user?.name}</span>
              <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">Login</Button>
              <Button size="sm">Sign Up</Button>
            </div>
          )}
        </div>
      </nav>
      {open && (
        <div className="flex flex-col gap-3 border-t border-border px-6 py-4 md:hidden">
          <Link href="/#features" className="text-sm text-secondary" onClick={() => setOpen(false)}>Features</Link>
          <Link href="/#contact" className="text-sm text-secondary" onClick={() => setOpen(false)}>Contact</Link>
          <Link href="/admin" className="text-sm text-secondary" onClick={() => setOpen(false)}>Admin</Link>
          {isAuthenticated ? (
            <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Login</Button>
              <Button size="sm">Sign Up</Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navigation;
