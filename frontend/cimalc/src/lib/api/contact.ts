import type { ContactFormInput } from "@/lib/validations/contact";

export async function submitContactForm(data: ContactFormInput): Promise<{ success: true }> {
    // TODO: replace with a real POST /contact call once the backend endpoint exists.
    return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 700));
}