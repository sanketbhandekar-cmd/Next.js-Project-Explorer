"use client";

import React, { useSyncExternalStore } from "react";

function subscribeTheme(callback: () => void) {
  window.addEventListener("theme-changed", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("theme-changed", callback);
    window.removeEventListener("storage", callback);
  };
}

function getThemeSnapshot(): "light" | "dark" {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem("project-explorer-theme");
  return stored === "light" ? "light" : "dark";
}

function getServerThemeSnapshot(): "light" | "dark" {
  return "dark";
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("project-explorer-theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    window.dispatchEvent(new Event("theme-changed"));
  };

  return (
    <button
      onClick={toggleTheme}
      id="theme-toggle-btn"
      aria-label="Toggle theme"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="px-2.5 py-1 text-xs font-medium rounded border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
