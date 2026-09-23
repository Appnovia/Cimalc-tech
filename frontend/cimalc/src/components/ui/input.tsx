import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";
import { useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    hint?: string;
    error?: string;
}

export function Input({ label, hint, error, className, id, ...props }: InputProps) {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label htmlFor={inputId} className="text-sm font-medium text-default">
                    {label}
                </label>
            )}
            <input
                id={inputId}
                className={cn(
                    "h-11 rounded-sm border border-border bg-surface px-4 text-sm text-default placeholder:text-muted",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    error && "border-error focus-visible:ring-error",
                    className,
                )}
                aria-invalid={!!error}
                aria-describedby={error || hint ? `${inputId}-desc` : undefined}
                {...props}
            />
            {(error || hint) && (
                <span
                    id={`${inputId}-desc`}
                    className={cn("text-xs", error ? "text-error" : "text-muted")}
                >
                    {error ?? hint}
                </span>
            )}
        </div>
    );
}