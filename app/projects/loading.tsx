import React from "react";

export default function ProjectsLoading() {
  return (
    <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
      <p className="text-sm font-medium text-slate-600 dark:text-slate-300 animate-pulse">
        Loading projects...
      </p>
    </div>
  );
}
