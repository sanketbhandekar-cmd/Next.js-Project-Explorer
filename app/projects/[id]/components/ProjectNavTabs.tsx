"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavTabsInner({ projectId }: { projectId: string }) {
  const pathname = usePathname();

  const tabs = [
    { href: `/projects/${projectId}`, label: "Overview", exact: true },
    { href: `/projects/${projectId}/team`, label: "Team" },
    { href: `/projects/${projectId}/tasks`, label: "Tasks" },
    { href: `/projects/${projectId}/activity`, label: "Activity" },
    { href: `/projects/${projectId}/docs`, label: "Docs" },
  ];

  const isTabActive = (href: string, exact = false) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <nav className="flex items-center gap-1 border-b border-slate-200 dark:border-slate-800 pb-px overflow-x-auto">
      {tabs.map((tab) => {
        const active = isTabActive(tab.href, tab.exact);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-3 py-2 text-xs font-semibold border-b-2 whitespace-nowrap transition ${
              active
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function ProjectNavTabs({ projectId }: { projectId: string }) {
  return (
    <Suspense fallback={<div className="h-8 bg-slate-100 dark:bg-slate-800 rounded" />}>
      <NavTabsInner projectId={projectId} />
    </Suspense>
  );
}
