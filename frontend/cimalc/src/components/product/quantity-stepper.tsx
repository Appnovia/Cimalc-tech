"use client";

import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
}

export function QuantityStepper({ value, onChange, min = 1 }: QuantityStepperProps) {
    return (
        <div className="inline-flex items-center rounded-sm border border-border">
            <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => onChange(Math.max(min, value - 1))}
                className="grid h-11 w-11 place-items-center text-default transition-colors duration-150 ease-out hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
                <Minus className="h-4 w-4" />
            </button>
            <span className="w-10 text-center font-mono text-sm">{value}</span>
            <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => onChange(value + 1)}
                className="grid h-11 w-11 place-items-center text-default transition-colors duration-150 ease-out hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
                <Plus className="h-4 w-4" />
            </button>
        </div>
    );
}