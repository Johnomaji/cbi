"use client";

import { Sun, Moon } from "lucide-react";
import { useState } from "react";

const STORAGE_KEY = "cbi-theme";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved === "dark";
    return document.documentElement.classList.contains("dark");
  });

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="p-2 rounded-full text-fg2 hover:bg-muted transition-colors"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
