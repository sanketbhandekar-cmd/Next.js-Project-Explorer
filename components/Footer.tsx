import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© 2026 Project Explorer. Built with Next.js App Router.</p>
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          <Link href="/projects" className="hover:underline">Projects</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/projects/error" className="hover:underline text-rose-500">Test Error</Link>
        </div>
      </div>
    </footer>
  );
}
