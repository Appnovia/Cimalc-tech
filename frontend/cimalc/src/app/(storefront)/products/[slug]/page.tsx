"use client";

import { use, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductBySlug, getProductsByCategory } from "@/lib/api/products";
import { productKeys } from "@/lib/queries/products";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductGrid } from "@/components/product/product-grid";
import { RequestQuoteDialog } from "@/components/product/request-qoute-dialog";
import { Button } from "@/components/ui/botton";
import { RecentlyViewedProducts } from "@/components/product/recently-viewed-products";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);

    const { data: product, isLoading, isError } = useQuery({
        queryKey: productKeys.detail(slug),
        queryFn: () => getProductBySlug(slug),
        retry: false,
    });

    const { data: relatedProducts } = useQuery({
        queryKey: productKeys.byCategory(product?.categorySlug ?? ""),
        queryFn: () => getProductsByCategory(product!.categorySlug),
        enabled: !!product,
    });

    if (isLoading) {
        return (
            <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-8">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_420px]">
                    <Skeleton className="aspect-square w-full" />
                    <div className="flex flex-col gap-4">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-6 w-1/3" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="mx-auto max-w-[1440px] px-4 py-16 md:px-8">
                <ErrorState title="Product not found" description="This product doesn't exist or may have been removed." />
                <div className="mt-6 flex justify-center">
                    <Button href="/products" variant="secondary">Back to Products</Button>
                </div>
            </div>
        );
    }

    const related = relatedProducts?.filter((p) => p.id !== product.id) ?? [];

    return (
        <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-8">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: product.name }]} />
            <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-[1fr_420px]">
                <ProductGallery images={product.images} />
                <div className="flex flex-col gap-5">
                    {!product.inStock && <Badge variant="neutral">Out of stock</Badge>}
                    <h1 className="text-2xl font-bold text-default">{product.name}</h1>
                    <p className="text-sm leading-relaxed text-muted">{product.description}</p>
                    <div className="rounded-md border border-brand/15 bg-brand/[0.04] p-4"><p className="text-sm font-semibold text-brand">Get a tailored quote</p><p className="mt-1 text-sm leading-5 text-muted">Tell us what you need and weâ€™ll confirm current availability and the best available pricing.</p></div>
                    <Button size="lg" variant="primary" onClick={() => setIsQuoteOpen(true)} disabled={!product.inStock}>
                        Request a Quote
                    </Button>
                    <p className="text-xs text-muted">No payment is required to request a quote.</p>
                </div>
            </div>
            {related.length > 0 && (
                <section className="mt-16">
                    <h2 className="mb-6 text-xl font-bold text-default">Related Products</h2>
                    <ProductGrid products={related} />
                </section>
            )}
            {product.specifications && product.specifications.length > 0 && <section className="mt-16 max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">At a glance</p><h2 className="mt-2 text-2xl font-bold tracking-tight text-default">Product details</h2><div className="mt-6 overflow-hidden rounded-md border border-border bg-surface"><dl>{product.specifications.map((specification, index) => <div key={specification.label} className={`grid gap-3 px-4 py-4 text-sm sm:grid-cols-[180px_1fr] ${index > 0 ? "border-t border-border" : ""}`}><dt className="font-medium text-muted">{specification.label}</dt><dd className="text-default">{specification.value}</dd></div>)}</dl></div></section>}
            <RecentlyViewedProducts productId={product.id} />
            <section className="mt-16 rounded-md bg-brand p-6 text-white md:flex md:items-center md:justify-between md:gap-8 md:p-10"><div><p className="text-xs font-medium uppercase tracking-[0.16em] text-white/60">Need a second opinion?</p><h2 className="mt-2 text-xl font-bold">We can help you choose.</h2><p className="mt-2 max-w-xl text-sm leading-6 text-white/70">Tell us about your use case, quantity, or budget and our team can point you toward the right option.</p></div><Button href="/contact" variant="secondary" size="lg" className="mt-5 shrink-0 md:mt-0">Talk to our team</Button></section>
            <RequestQuoteDialog isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} productId={product.id} productName={product.name} />
        </div>
    );
}

