import { z } from "zod";

export const productSchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters."),
    description: z.string().trim().min(10, "Description must be at least 10 characters."),
    price: z.coerce.number().positive("Price must be greater than zero."),
    categorySlug: z.string().min(1, "Choose a category."),
    inStock: z.boolean(),
    images: z.array(z.object({ id: z.string(), url: z.string(), alt: z.string(), storageKey: z.string().optional() })).max(5, "A product can have up to 5 images.").optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
