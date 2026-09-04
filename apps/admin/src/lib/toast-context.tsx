'use client';

import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { createContext, useCallback, useContext, useState } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  push: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const STYLES: Record<ToastType, string> = {
  // `--success-solid` — a dedicated success color instead of reusing the
  // brand's primary blue (a prior inconsistency with the Badge system's
  // own success color), and not `--success` itself, which also serves as
  // green *text* on a light tint elsewhere and needs a different,
  // theme-adaptive value there than a solid white-text fill needs here.
  success: 'bg-[var(--success-solid)] text-white',
  // See Button.tsx's `danger` variant comment — `--danger-solid`, not
  // `--danger`, for the same white-text-on-solid-fill contrast reason.
  error: 'bg-[var(--danger-solid)] text-white',
  info: 'bg-slate-900 text-white',
};

const ICONS: Record<ToastType, typeof CheckCircle2> = {
  success: CheckCircle2,
  error: AlertTriangle,
  info: Info,
};

let nextId = 1;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (message: string, type: ToastType = 'info') => {
      const id = nextId++;
      setToasts((prev) => [...prev, { id, message, type }]);
      // Errors stay until the admin dismisses them — a save/delete failure
      // is exactly the message someone might glance away for 3 seconds and
      // then have no idea why their action didn't work. Success/info are
      // fine to clear themselves.
      if (type !== 'error') {
        setTimeout(() => dismiss(id), 3200);
      }
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="pointer-events-none fixed bottom-5 right-5 z-[100] space-y-2">
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type];
          return (
            <div
              key={toast.id}
              role={toast.type === 'error' ? 'alert' : 'status'}
              aria-live={toast.type === 'error' ? 'assertive' : 'polite'}
              aria-atomic="true"
              className={`animate-toast-in pointer-events-auto flex items-center gap-2.5 rounded-xl px-4 py-3 text-xs font-bold shadow-2xl ${STYLES[toast.type]}`}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{toast.message}</span>
              <button
                onClick={() => dismiss(toast.id)}
                className="ml-1 shrink-0 opacity-70 hover:opacity-100"
                aria-label="Dismiss"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
