import React from "react";
import ThemeToggle from "@/components/ThemeToggle";

export default function SettingsPage() {
  return (
    <div className="space-y-6 py-4 max-w-lg">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Settings
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Manage user preferences and application theme.
        </p>
      </div>

      <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Display Name
          </label>
          <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Sanket Bhandekar
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Role
          </label>
          <div className="text-xs text-slate-600 dark:text-slate-400">
            Frontend Lead (Engineering)
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <label className="block text-xs font-medium text-slate-500 mb-2">
            Appearance
          </label>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

