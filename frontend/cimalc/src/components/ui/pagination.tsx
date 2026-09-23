"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav aria-label="Pagination" className="flex items-center justify-center gap-2">
            <button
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="grid h-11 w-11 place-items-center rounded-sm text-default transition-colors duration-150 ease-out hover:bg-background disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
                <ChevronLeft className="h-4 w-4" />
            </button>
            {pages.map((page) => (
                <button
                    key={page}
                    aria-label={`Page ${page}`}
                    aria-current={page === currentPage ? "page" : undefined}
                    onClick={() => onPageChange(page)}
                    className={cn(
                        "grid h-11 w-11 place-items-center rounded-sm text-sm font-medium transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                        page === currentPage ? "bg-brand text-white" : "text-default hover:bg-background",
                    )}
                >
                    {page}
                </button>
            ))}
            <button
                aria-label="Next page"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="grid h-11 w-11 place-items-center rounded-sm text-default transition-colors duration-150 ease-out hover:bg-background disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
                <ChevronRight className="h-4 w-4" />
            </button>
        </nav>
    );
}