"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error boundary caught:", error);
  }, [error]);

  return (
    <div className="p-8 my-6 text-center rounded-lg border border-rose-200 dark:border-rose-900 bg-white dark:bg-slate-900 space-y-4 max-w-md mx-auto">
      <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center mx-auto text-lg font-bold">
        !
      </div>

      <div className="space-y-1">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Failed to Load Projects
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          {error.message || "An unexpected error occurred while loading project records."}
        </p>
      </div>

      <div className="flex justify-center gap-3 pt-2">
        <button
          onClick={() => reset()}
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer"
        >
          Try Again
        </button>

        <Link
          href="/projects"
          className="px-4 py-2 rounded border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          Back to Projects
        </Link>
      </div>
    </div>
  );
}
