"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, Boxes, FolderTree, PackageX, Sparkles } from "lucide-react";
import { getCategories } from "@/lib/api/categories";
import { getProducts } from "@/lib/api/products";
import { categoryKeys } from "@/lib/queries/categories";
import { productKeys } from "@/lib/queries/products";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/botton";
import { cn } from "@/lib/utils";
import { getAdminStats } from "@/lib/api/dashboard";

const stats = [
    { key: "products", label: "Total products", icon: Boxes, tone: "bg-brand/10 text-brand" },
    { key: "categories", label: "Total categories", icon: FolderTree, tone: "bg-success-bg text-success" },
    { key: "outOfStock", label: "Out of stock", icon: PackageX, tone: "bg-warning-bg text-warning" },
] as const;

export default function AdminDashboardPage() {
    const productsQuery = useQuery({ queryKey: productKeys.lists(), queryFn: getProducts });
    const categoriesQuery = useQuery({ queryKey: categoryKeys.lists(), queryFn: getCategories });
    const statsQuery = useQuery({ queryKey: ["admin", "stats"], queryFn: getAdminStats });
    const isLoading = productsQuery.isLoading || categoriesQuery.isLoading || statsQuery.isLoading;
    const isError = productsQuery.isError || categoriesQuery.isError || statsQuery.isError;
    const products = productsQuery.data ?? [];
    const categories = categoriesQuery.data ?? [];
    const values = { products: statsQuery.data?.totalProducts ?? products.length, categories: statsQuery.data?.totalCategories ?? categories.length, outOfStock: products.filter((product) => !product.inStock).length };

    return (
        <div className="space-y-8">
            <div className="sm:hidden"><Breadcrumb items={[{ label: "Admin" }, { label: "Dashboard" }]} /></div>
            <section className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                    <div className="mb-3 hidden items-center gap-2 text-xs font-medium text-brand md:flex"><Sparkles className="h-4 w-4" aria-hidden="true" />Catalog overview</div>
                    <h1 className="text-3xl font-bold tracking-tight text-default md:text-4xl">Good morning, team.</h1>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">A focused view of the Cimalc Tech catalog. Manage the products and categories that power your storefront.</p>
                </div>
                <Button href="/admin/products">Manage products <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Button>
            </section>
            <div className="rounded-md border border-brand/15 bg-brand/[0.04] px-4 py-3 text-sm text-brand">Catalog metrics are synced from the admin API. Quote and order insights will appear as those workflows go live.</div>
            {isError ? <ErrorState onRetry={() => { void productsQuery.refetch(); void categoriesQuery.refetch(); }} /> : (
                <div className="grid gap-4 md:grid-cols-3">
                    {stats.map(({ key, label, icon: Icon, tone }) => (
                        <Card key={key} className="overflow-hidden"><CardContent className="flex items-start justify-between p-5 md:p-6"><div><p className="text-sm text-muted">{label}</p>{isLoading ? <Skeleton className="mt-3 h-9 w-20" /> : <p className="mt-2 text-3xl font-bold tracking-tight text-default">{values[key]}</p>}<p className="mt-3 text-xs text-muted">From current catalog data</p></div><div className={cn("grid h-11 w-11 place-items-center rounded-md", tone)}><Icon className="h-5 w-5" aria-hidden="true" /></div></CardContent></Card>
                    ))}
                </div>
            )}
            <Card><CardContent className="p-5 md:p-6"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-lg font-semibold text-default">Next steps</h2><p className="mt-1 text-sm text-muted">Keep the catalog fresh while the backend statistics are being connected.</p></div><Button href="/admin/categories" variant="secondary" size="sm">Review categories <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Button></div></CardContent></Card>
        </div>
    );
}

