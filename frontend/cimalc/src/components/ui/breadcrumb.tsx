import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
    return (
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted">
            {items.map((item, i) => (
                <span key={i} className="flex items-center gap-2">
                    {item.href ? (
                        <Link href={item.href} className="hover:text-brand">{item.label}</Link>
                    ) : (
                        <span aria-current="page" className="text-default">{item.label}</span>
                    )}
                    {i < items.length - 1 && <ChevronRight className="h-3.5 w-3.5" />}
                </span>
            ))}
        </nav>
    );
}