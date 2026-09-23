import { z } from "zod";

export const contactFormSchema = z.object({
    name: z.string().min(2, "Please enter your full name"),
    email: z.string().email("Please enter a valid email address"),
    message: z.string().min(10, "Please enter a message (min 10 characters)"),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;