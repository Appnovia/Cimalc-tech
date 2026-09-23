import { QuoteRequestInput } from "../validations/qoute";
import { apiRequest } from "./client";


export async function submitQuoteRequest(
    productId: string,
    data: QuoteRequestInput & { quantity: number },
): Promise<{ success: true }> {
    return apiRequest<{ success: true; id?: string; reference?: string }>("/quotes", { method: "POST", body: JSON.stringify({ customerName: data.name, email: data.email, phone: data.phone, productId, quantity: data.quantity, message: data.message }) });
}
