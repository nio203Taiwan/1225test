import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';
import { ToastState } from '../types';

interface Props {
  toast: ToastState;
}

export function Toast({ toast }: Props) {
  if (!toast.show) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-pop">
      <div
        className={clsx(
          'flex items-center gap-3 px-6 py-4 rounded-full shadow-lg border',
          toast.type === 'success'
            ? 'bg-green-600 text-white border-green-500'
            : 'bg-red-50 text-red-800 border-red-200'
        )}
      >
        {toast.type === 'success' ? (
          <CheckCircle2 className="w-5 h-5" />
        ) : (
          <AlertCircle className="w-5 h-5" />
        )}
        <span className="font-medium text-sm md:text-base whitespace-nowrap">
          {toast.message}
        </span>
      </div>
    </div>
  );
}