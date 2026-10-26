import React from "react";
import { getRecentActivityStream } from "@/lib/projects";

export default async function RecentActivityStream() {
  // Simulates slow data fetch for React Suspense and Streaming demonstration
  const activities = await getRecentActivityStream(1500);

  return (
    <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
      <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">
          Recent Activity
        </h3>
      </div>

      <div className="space-y-2 text-xs">
        {activities.map((act) => (
          <div
            key={act.id}
            className="p-2.5 rounded border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3"
          >
            <div>
              <span className="font-semibold text-slate-900 dark:text-white mr-1.5">
                {act.user}
              </span>
              <span className="text-slate-500">{act.action}</span>
              <div className="text-slate-600 dark:text-slate-400 font-mono text-[11px] mt-0.5">
                {act.target}
              </div>
            </div>
            <span className="text-[11px] text-slate-400 shrink-0">{act.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
