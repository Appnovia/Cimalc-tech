"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api/products";
import { ProductGrid } from "./product-grid";
import type { Product } from "@/types/product";

const STORAGE_KEY = "cimalc-recently-viewed";

export function RecentlyViewedProducts({ productId }: { productId: string }) {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => { let active = true; const ids = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as string[]; const nextIds = [productId, ...ids.filter((id) => id !== productId)].slice(0, 6); window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextIds)); void getProducts().then((items) => { if (active) setProducts(nextIds.map((id) => items.find((item) => item.id === id)).filter((item): item is Product => Boolean(item) && item?.id !== productId).slice(0, 4)); }); return () => { active = false; }; }, [productId]);
    if (!products.length) return null;
    return <section className="mt-16 border-t border-border pt-12"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Keep exploring</p><h2 className="mt-2 mb-6 text-2xl font-bold tracking-tight text-default">Recently viewed</h2><ProductGrid products={products} /></section>;
}
