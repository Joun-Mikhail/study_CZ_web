"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Info, AlertCircle, X } from "lucide-react";

export type ToastVariant = "success" | "info" | "error";

type ToastItem = {
  id: number;
  message: string;
  variant: ToastVariant;
};

type ToastContextType = {
  toast: (message: string, variant?: ToastVariant) => void;
  dismiss: (id: number) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

const TOAST_DURATION = 3200;

const variantStyles: Record<
  ToastVariant,
  { icon: typeof Info; className: string; iconClassName: string }
> = {
  success: {
    icon: CheckCircle2,
    className: "border-success/30 bg-success/10",
    iconClassName: "text-success",
  },
  info: {
    icon: Info,
    className: "border-info/30 bg-info/10",
    iconClassName: "text-info",
  },
  error: {
    icon: AlertCircle,
    className: "border-red-500/30 bg-red-500/10",
    iconClassName: "text-red-400",
  },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, variant: ToastVariant = "info") => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev.slice(-2), { id, message, variant }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, TOAST_DURATION);
    },
    []
  );

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="fixed bottom-24 sm:bottom-6 start-4 end-4 sm:end-auto sm:start-6 z-[70] flex flex-col gap-2 pointer-events-none sm:max-w-sm"
        role="region"
        aria-label="Notifications"
      >
        <AnimatePresence initial={false}>
          {toasts.map(({ id, message, variant }) => {
            const { icon: Icon, className, iconClassName } =
              variantStyles[variant];
            return (
              <motion.div
                key={id}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                role="status"
                aria-live="polite"
                className={`pointer-events-auto flex items-center gap-3 rounded-xl border px-4 py-3 backdrop-blur-md shadow-lg shadow-black/20 ${className}`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${iconClassName}`} />
                <p className="flex-1 text-sm font-medium text-text-primary">
                  {message}
                </p>
                <button
                  onClick={() => dismiss(id)}
                  className="shrink-0 text-text-secondary hover:text-text-primary transition-colors"
                  aria-label="Dismiss notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
