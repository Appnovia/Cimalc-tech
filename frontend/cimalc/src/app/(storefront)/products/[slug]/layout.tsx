import type { Metadata } from "next";
import { getProductBySlug } from "@/lib/api/products";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cimalc-tech.com";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProductBySlug(slug);
    const image = product.images[0]?.url ?? "/brand/cimalc-logo.png";
    return { title: product.name, description: product.description, alternates: { canonical: `${siteUrl}/products/${product.slug}` }, openGraph: { title: product.name, description: product.description, type: "website", images: [{ url: image, alt: product.name }] }, twitter: { card: "summary_large_image", title: product.name, description: product.description, images: [image] } };
  } catch { return { title: "Product | Cimalc Tech", robots: { index: false, follow: false } }; }
}

export default async function ProductSlugLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) { const { slug } = await params; let schema: Record<string, unknown> | null = null; try { const product = await getProductBySlug(slug); schema = { "@context": "https://schema.org", "@type": "Product", name: product.name, description: product.description, image: product.images.map((image) => image.url), sku: product.id, brand: { "@type": "Brand", name: "Cimalc Tech" } }; } catch {} return <>{children}{schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}</>; }
