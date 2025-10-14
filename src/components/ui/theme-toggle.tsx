"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // avoid hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const current = theme ?? resolvedTheme;
  const isDark = current === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "day" : "night"} mode`}
      className={`relative flex items-center gap-3 px-4 py-2 rounded-full font-medium transition-all
        ${isDark ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-800"}`}
    >
      <div
        className={`absolute top-1/2 -translate-y-1/2 transition-all duration-300 w-8 h-8 rounded-full flex items-center justify-center
          ${isDark ? "left-2 bg-gray-700" : "right-2 bg-white"}`}
      >
        {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      </div>
      <span className={`z-10 transition-all duration-300 ${isDark ? "ml-10" : "mr-10"}`}>
        {isDark ? "NIGHTMODE" : "DAYMODE"}
      </span>
    </button>
  );
}
