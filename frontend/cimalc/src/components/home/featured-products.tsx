"use client";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedProducts } from "@/lib/api/products";
import { productKeys } from "@/lib/queries/products";
import { ProductGrid, ProductGridSkeleton } from "@/components/product/product-grid";
import { ErrorState } from "@/components/ui/error-state";
export function FeaturedProducts() { const { data: products, isLoading, isError, refetch } = useQuery({ queryKey: [...productKeys.lists(), "featured"], queryFn: getFeaturedProducts }); return <section className="bg-surface py-16 text-default md:py-20"><div className="mx-auto max-w-[1440px] px-4 md:px-8"><div className="mb-8"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Popular right now</p></div>{isLoading && <ProductGridSkeleton />}{isError && <ErrorState onRetry={() => refetch()} />}{products && <ProductGrid products={products.slice(0, 4)} />}</div></section>; }
