'use client';
import { Toaster } from 'react-hot-toast';

export const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-left"
      toastOptions={{
        style: {
          fontSize: 14,
          fontWeight: 400,
          color: 'hsl(var(--foreground))',
          border: '1px solid hsl(var(--border))',
          backgroundColor: 'hsl(var(--card))',
          borderRadius: 'var(--radius)',
          boxShadow: 'none',
        },
      }}
    />
  );
};
