"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-amber mb-4">Oops</h1>
        <h2 className="text-xl font-semibold text-text-primary mb-3">
          Something went wrong
        </h2>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-block px-6 py-3 rounded-xl bg-amber hover:bg-amber-hover text-white font-medium transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
