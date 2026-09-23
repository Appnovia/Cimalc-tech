"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { BarChart3, Boxes, FileText, FolderTree, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/botton";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const navigation = [
    { href: "/admin", label: "Dashboard", icon: BarChart3 },
    { href: "/admin/products", label: "Products", icon: Boxes },
    { href: "/admin/categories", label: "Categories", icon: FolderTree },
    { href: "/admin/quotes", label: "Quotes", icon: FileText },
];

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
    const pathname = usePathname();

    return (
        <aside className="flex h-full w-72 flex-col border-r border-border bg-surface px-4 py-5">
            <Link href="/admin" className="mb-10 flex items-center gap-3 px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
                <img src="/brand/cimalc-logo.png" alt="Cimalc Tech" className="h-12 w-32 object-contain object-left" />
                <span className="sr-only">Admin workspace</span>
            </Link>
            <Link href="/" className="mb-5 flex min-h-11 items-center rounded-sm px-3 text-sm font-medium text-muted transition-colors hover:bg-background hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">â† Back to storefront</Link>
            <nav aria-label="Admin navigation" className="flex flex-col gap-1">
                <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Workspace</p>
                {navigation.map(({ href, label, icon: Icon }) => {
                    const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
                    return (
                        <Link
                            key={href}
                            href={href}
                            onClick={onNavigate}
                            className={cn(
                                "flex min-h-11 items-center gap-3 rounded-sm px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
                                active ? "bg-brand text-white" : "text-default hover:bg-background hover:text-brand",
                            )}
                        >
                            <Icon className="h-4 w-4" aria-hidden="true" />
                            {label}
                        </Link>
                    );
                })}
            </nav>
            <div className="mt-auto flex items-center justify-between gap-3 rounded-md bg-background p-3"><div><p className="text-xs font-semibold text-default">Appearance</p><p className="mt-1 text-xs text-muted">Switch theme</p></div><ThemeToggle /></div>
        </aside>
    );
}

function getBreadcrumbs(pathname: string) {
    if (pathname.startsWith("/admin/products")) return [{ label: "Admin", href: "/admin" }, { label: "Products" }];
    if (pathname.startsWith("/admin/categories")) return [{ label: "Admin", href: "/admin" }, { label: "Categories" }];
    return [{ label: "Admin" }, { label: "Dashboard" }];
}

export function AdminShell({ children }: { children: React.ReactNode }) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-background">
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex"><Sidebar /></div>
            <div className="lg:pl-72">
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-surface/95 px-4 backdrop-blur md:px-8">
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" className="h-11 w-11 p-0 lg:hidden" aria-label="Open admin navigation" onClick={() => setIsMobileOpen(true)}>
                            <Menu className="h-5 w-5" aria-hidden="true" />
                        </Button>
                        <div className="hidden sm:block"><Breadcrumb items={getBreadcrumbs(pathname)} /></div>
                        <span className="text-sm font-semibold text-default sm:hidden">Cimalc Tech Admin</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="hidden text-xs text-muted md:inline">Catalog workspace</span>
                        <div className="grid h-9 w-9 place-items-center rounded-full bg-brand/10 text-xs font-bold text-brand" aria-label="Admin workspace avatar">CT</div>
                    </div>
                </header>
                <main className="mx-auto max-w-[1600px] p-4 md:p-8">{children}</main>
            </div>
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.button aria-label="Close admin navigation" className="fixed inset-0 z-40 bg-brand/30 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileOpen(false)} />
                        <motion.div className="fixed inset-y-0 left-0 z-50 lg:hidden" initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }} transition={{ type: "spring", damping: 28, stiffness: 260 }}>
                            <div className="relative h-full"><Sidebar onNavigate={() => setIsMobileOpen(false)} /><Button variant="ghost" size="sm" className="absolute right-3 top-3 h-11 w-11 p-0" aria-label="Close admin navigation" onClick={() => setIsMobileOpen(false)}><X className="h-5 w-5" aria-hidden="true" /></Button></div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

