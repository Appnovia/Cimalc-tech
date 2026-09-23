type SupportedCurrency = "NGN";

export function formatCurrency(
    amount: number,
    currency: SupportedCurrency = "NGN",
): string {
    if (currency === "NGN") {
        return `₦${Math.round(amount).toLocaleString("en-NG")}`;
    }
    return `${amount}`;
}