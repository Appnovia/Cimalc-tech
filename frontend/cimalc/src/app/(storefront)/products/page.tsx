import { Suspense } from "react";
import { ProductGridSkeleton } from "@/components/product/product-grid";
import ProductsBrowser from "./products-browser";

export default function ProductsPage() { return <Suspense fallback={<div className="mx-auto max-w-[1440px] px-4 py-8 md:px-8"><ProductGridSkeleton count={9} /></div>}><ProductsBrowser /></Suspense>; }
