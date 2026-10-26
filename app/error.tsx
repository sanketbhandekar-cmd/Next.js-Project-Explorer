"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <div className="p-8 my-10 text-center rounded-lg border border-rose-200 dark:border-rose-900 bg-white dark:bg-slate-900 space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
        Something went wrong!
      </h2>
      <p className="text-xs text-slate-600 dark:text-slate-400">
        {error.message || "An unexpected error occurred."}
      </p>
      <div className="flex justify-center gap-3 pt-2">
        <button
          onClick={() => reset()}
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-4 py-2 rounded border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
