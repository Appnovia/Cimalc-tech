import { z } from "zod";

export const quoteRequestSchema = z.object({
    name: z.string().min(2, "Please enter your full name"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().optional(),
    message: z.string().max(500, "Message must be under 500 characters").optional(),
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;