import type { Metadata } from "next";
import { getCategoryBySlug } from "@/lib/api/categories";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cimalc-tech.com";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const category = await getCategoryBySlug(slug);
    const description = category.description ?? `Explore ${category.name} products at Cimalc Tech and request a tailored quote.`;
    return { title: category.name, description, alternates: { canonical: `${siteUrl}/categories/${category.slug}` }, openGraph: { title: `${category.name} | Cimalc Tech`, description, type: "website", images: [{ url: "/brand/cimalc-logo.png", alt: "Cimalc Tech" }] }, twitter: { card: "summary_large_image", title: `${category.name} | Cimalc Tech`, description, images: ["/brand/cimalc-logo.png"] } };
  } catch { return { title: "Category | Cimalc Tech", robots: { index: false, follow: false } }; }
}

export default async function CategorySlugLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) { const { slug } = await params; const schema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }, { "@type": "ListItem", position: 2, name: "Categories", item: `${siteUrl}/categories` }, { "@type": "ListItem", position: 3, name: slug, item: `${siteUrl}/categories/${slug}` }] }; return <>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></>; }
