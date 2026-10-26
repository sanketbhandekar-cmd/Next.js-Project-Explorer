"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const projectLinks = [
  { id: "1", title: "1. Next.js Web Portal", href: "/projects/1" },
  { id: "2", title: "2. Analytics Dashboard", href: "/projects/2" },
  { id: "3", title: "3. Mobile App API", href: "/projects/3" },
  { id: "4", title: "4. Cloud Infrastructure", href: "/projects/4" },
];

function SidebarLinks() {
  const pathname = usePathname();

  return (
    <div className="space-y-4">
      <div>
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          Dashboard
        </div>
        <Link
          href="/dashboard"
          className={`block px-3 py-1.5 rounded text-xs font-medium transition ${
            pathname === "/dashboard"
              ? "bg-blue-600 text-white"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          Executive Overview
        </Link>
      </div>

      <div>
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          Project Shortcuts
        </div>
        <div className="space-y-1">
          {projectLinks.map((p) => (
            <Link
              key={p.id}
              href={p.href}
              className="block px-3 py-1.5 rounded text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {p.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
        <Link
          href="/projects"
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline block px-3"
        >
          View All Projects →
        </Link>
      </div>
    </div>
  );
}

export default function DashboardSidebar() {
  return (
    <aside className="w-full lg:w-56 shrink-0 p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 self-start">
      <Suspense fallback={<div className="h-32 bg-slate-100 dark:bg-slate-800 rounded" />}>
        <SidebarLinks />
      </Suspense>
    </aside>
  );
}
