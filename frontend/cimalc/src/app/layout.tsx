import type { Metadata } from "next";
import { DM_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Phone } from "lucide-react";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-dm-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Cimalc Tech",
  icons: { icon: "/icon.png", shortcut: "/icon.png", apple: "/icon.png" },
  description: "Phones, laptops, gadgets, accessories, and affordable repair services from Cimalc Tech in Ajah, Lagos.",
  keywords: ["phones Lagos", "laptops Ajah", "gadgets Nigeria", "electronics repair Ajah", "Cimalc Tech", "accessories Lagos"],
  openGraph: { title: "Cimalc Tech | Technology, selected for you", description: "Explore thoughtfully selected electronics and request a tailored quote.", type: "website", siteName: "Cimalc Tech", images: [{ url: "/brand/cimalc-logo.png", width: 512, height: 512, alt: "Cimalc Tech" }] },
  twitter: { card: "summary_large_image", title: "Cimalc Tech | Technology, selected for you", description: "Explore thoughtfully selected electronics and request a tailored quote.", images: ["/brand/cimalc-logo.png"] },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cimalc Tech",
  url: "https://cimalc-tech.com",
  logo: "https://cimalc-tech.com/brand/cimalc-logo.png",
  description: "Phones, laptops, gadgets, accessories, and affordable repair services from Cimalc Tech.",
  telephone: "+2348033911760",
  address: { "@type": "PostalAddress", streetAddress: "Block F1, 446/447 HFP Eastline Shopping Complex, Abraham Adesanya", addressLocality: "Ajah", addressRegion: "Lagos State", addressCountry: "NG" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${manrope.variable} ${dmMono.variable}`}><body className="min-w-0 overflow-x-hidden"><Providers>{children}<a href="tel:+2348033911760" aria-label="Call Cimalc Tech on +234 803 391 1760" className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full border border-border bg-surface text-accent shadow-lg transition-colors hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"><Phone className="h-5 w-5" aria-hidden="true" /></a></Providers><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} /></body></html>;
}


