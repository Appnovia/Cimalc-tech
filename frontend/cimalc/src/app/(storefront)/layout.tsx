import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: { default: "Cimalc Tech | Technology, selected for you", template: "%s | Cimalc Tech" },
    description: "Explore thoughtfully selected electronics and request a tailored quote from Cimalc Tech.",
};

export default function StorefrontLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}

