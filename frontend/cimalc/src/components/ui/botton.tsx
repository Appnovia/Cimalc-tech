import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-colors duration-150 ease-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
    {
        variants: {
            variant: {
                primary: "bg-brand text-white hover:bg-brand/90",
                secondary: "border border-brand text-brand bg-transparent hover:bg-brand/5",
                ghost: "text-brand hover:bg-brand/5",
                destructive: "bg-error text-white hover:bg-error/90",
                // Reserved exclusively for Flutterwave/payment actions. Never reuse for general CTAs.
                payment: "bg-payment text-[#0B0C0E] hover:bg-payment/90",
            },
            size: {
                sm: "h-9 px-3 text-sm",
                md: "h-11 px-5 text-sm",
                lg: "h-13 px-6 text-base",
            },
        },
        defaultVariants: { variant: "primary", size: "md" },
    },
);

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
    href?: string;
}

export function Button({
    className,
    variant,
    size,
    isLoading,
    href,
    children,
    disabled,
    ...props
}: ButtonProps) {
    const classes = cn(buttonVariants({ variant, size }), className);

    if (href) {
        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button className={classes} disabled={disabled || isLoading} {...props}>
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
}