"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
export function ThemeToggle({ className = "" }: { className?: string }) { const { theme, toggleTheme } = useTheme(); return <button type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} className={`grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-default transition-colors hover:bg-brand/5 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${className}`}>{theme === "dark" ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}</button>; }
