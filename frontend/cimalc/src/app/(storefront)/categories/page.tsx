"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api/categories";
import { categoryKeys } from "@/lib/queries/categories";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";

export default function CategoriesPage() { const { data: categories, isLoading, isError, refetch } = useQuery({ queryKey: categoryKeys.lists(), queryFn: getCategories }); return <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-8 md:py-12"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Categories" }]} /><div className="mt-12 max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Browse with intention</p><h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Find your next essential.</h1><p className="mt-4 text-base leading-7 text-muted">Start with a category, explore the details, and request a quote when something feels right.</p></div>{isLoading && <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="aspect-square w-full" />)}</div>}{isError && <div className="mt-12"><ErrorState onRetry={() => refetch()} /></div>}{categories && <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">{categories.map((category) => <Link key={category.id} href={`/categories/${category.slug}`} className="group relative aspect-square overflow-hidden rounded-md border border-border bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"><img src="/products/mock.png" alt="" className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-brand/90 via-brand/15 to-transparent" /><div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2"><span className="text-base font-semibold text-white md:text-lg">{category.name}</span><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-transform group-hover:translate-x-1"><ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span></div></Link>)}</div>}</div>; }
