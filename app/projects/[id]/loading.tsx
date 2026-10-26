import React from "react";

export default function ProjectDetailLoading() {
  return (
    <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
      <p className="text-sm font-medium text-slate-500 animate-pulse">
        Loading project details...
      </p>
    </div>
  );
}
