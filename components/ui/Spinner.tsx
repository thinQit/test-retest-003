import React from 'react';

type SpinnerProps = {
  className?: string;
};

export function Spinner({ className = '' }: SpinnerProps) {
  return (
    <div
      className={`inline-block h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent ${className}`}
      aria-label="Loading"
    />
  );
}
