"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/projects", label: "Projects" },
  { href: "/settings", label: "Settings" },
];

function NavLinks() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="flex items-center gap-1 sm:gap-2">
      {navLinks.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-1.5 rounded text-sm font-medium transition ${
              active
                ? "bg-blue-600 text-white"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function Header() {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-lg text-slate-900 dark:text-white">
            Project Explorer
          </Link>
          <Suspense fallback={<div className="h-8 w-48 bg-slate-100 dark:bg-slate-800 rounded" />}>
            <NavLinks />
          </Suspense>
        </div>

        <div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
