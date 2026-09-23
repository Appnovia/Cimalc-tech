"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types/product";

export function ProductGallery({ images }: { images: ProductImage[] }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeImage = images[activeIndex] ?? images[0];
    return <div className="flex flex-col gap-4"><div className="aspect-square w-full overflow-hidden rounded-md border border-border bg-background"><img src={activeImage?.url ?? "/products/mock.png"} alt={activeImage?.alt ?? "Product image"} className="h-full w-full object-cover" /></div>{images.length > 0 && <div className="flex gap-3">{images.map((image, i) => <button key={image.id} type="button" aria-label={`View image ${i + 1} of ${images.length}`} onClick={() => setActiveIndex(i)} className={cn("h-16 w-16 overflow-hidden rounded-sm border-2 bg-background transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand", activeIndex === i ? "border-brand" : "border-border")}><img src={image.url} alt="" className="h-full w-full object-cover" /></button>)}</div>}</div>;
}
