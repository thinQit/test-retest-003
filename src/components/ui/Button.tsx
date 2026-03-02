'use client';

import type { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition',
        variant === 'primary'
          ? 'bg-slate-900 text-white hover:bg-slate-800'
          : 'bg-slate-100 text-slate-900 hover:bg-slate-200',
        className
      )}
      {...props}
    />
  );
}
