import React from "react";

export default function DashboardLoading() {
  return (
    <div className="p-8 text-center text-slate-500 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
      <p className="text-sm font-medium animate-pulse">Loading dashboard...</p>
    </div>
  );
}
