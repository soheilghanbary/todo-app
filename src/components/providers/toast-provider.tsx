'use client';
import { Toaster } from 'react-hot-toast';

export const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          fontSize: 14,
          fontWeight: 500,
          color: 'hsl(var(--foreground))',
          border: '1px solid hsl(var(--border))',
          backgroundColor: 'hsl(var(--card))',
          borderRadius: 'var(--radius)',
        },
      }}
    />
  );
};
