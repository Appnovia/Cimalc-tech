import { z } from "zod";

export const categorySchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters."),
    description: z.string().trim().min(10, "Description must be at least 10 characters."),
});

export type CategoryInput = z.infer<typeof categorySchema>;
