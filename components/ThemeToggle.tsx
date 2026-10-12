"use client";

import { useEffect, useState } from "react";

/** Manual light/dark switch; without a saved choice the page follows the system setting. */
export function ThemeToggle({ light, dark }: { light: string; dark: string }) {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const saved = document.documentElement.dataset.theme;
    setTheme(saved === "light" || saved === "dark" ? saved : matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button type="button" className="theme-btn" onClick={toggle} aria-pressed={theme === "dark"}>
      {theme === "dark" ? light : dark}
    </button>
  );
}
