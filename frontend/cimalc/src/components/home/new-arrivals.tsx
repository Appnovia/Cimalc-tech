"use client";
import { useQuery } from "@tanstack/react-query";
import { getNewArrivals } from "@/lib/api/products";
import { productKeys } from "@/lib/queries/products";
import { ProductCard } from "@/components/product/product-card";
import { ProductGridSkeleton } from "@/components/product/product-grid";

export function NewArrivals() {
  const { data, isLoading } = useQuery({ queryKey: [...productKeys.lists(), "new-arrivals"], queryFn: getNewArrivals });
  const products = data?.slice(-4).reverse() ?? [];
  return <section className="overflow-hidden border-y border-border bg-background py-16 md:py-20"><div className="mx-auto max-w-[1440px] px-4 md:px-8"><div className="mb-8"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">New arrivals</p><h2 className="mt-2 text-2xl font-bold tracking-tight text-default md:text-3xl">Fresh finds for your everyday.</h2></div>{isLoading ? <ProductGridSkeleton count={4} /> : <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>}</div></section>;
}
