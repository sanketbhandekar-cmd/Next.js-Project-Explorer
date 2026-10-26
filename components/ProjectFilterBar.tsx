"use client";

import React, { Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

function FilterBarInner({
  currentSearch = "",
  currentStatus = "all",
}: {
  currentSearch?: string;
  currentStatus?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilters = (newSearch: string, newStatus: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newSearch.trim()) {
      params.set("search", newSearch.trim());
    } else {
      params.delete("search");
    }

    if (newStatus && newStatus !== "all") {
      params.set("status", newStatus);
    } else {
      params.delete("status");
    }

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters(e.target.value, currentStatus);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilters(currentSearch, e.target.value);
  };

  const clearFilters = () => {
    router.push(pathname);
  };

  const hasFilters = Boolean(currentSearch) || (currentStatus && currentStatus !== "all");

  return (
    <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Input */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search projects (e.g. nextjs, dashboard)..."
            value={currentSearch}
            onChange={handleSearchChange}
            className="w-full px-3 py-1.5 text-xs sm:text-sm rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-500 whitespace-nowrap">Status:</label>
          <select
            value={currentStatus}
            onChange={handleStatusChange}
            className="px-2.5 py-1.5 text-xs sm:text-sm rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-rose-600 dark:text-rose-400 hover:underline px-2 py-1 cursor-pointer"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

export default function ProjectFilterBar(props: {
  currentSearch?: string;
  currentStatus?: string;
}) {
  return (
    <Suspense fallback={<div className="h-16 bg-slate-100 dark:bg-slate-800 rounded" />}>
      <FilterBarInner {...props} />
    </Suspense>
  );
}
