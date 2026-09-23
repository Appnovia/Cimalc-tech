import { Button } from "../ui/botton";


export function QuoteCta() {
    return (
        <section className="mx-auto max-w-[1440px] px-4 py-16 md:px-8">
            <div className="flex flex-col items-center gap-4 rounded-md border border-border bg-surface p-10 text-center md:p-16">
                <h2 className="text-2xl font-bold text-default">Buying in bulk?</h2>
                <p className="max-w-md text-sm text-muted">
                    Request a custom quote for large orders and we will get back to you with volume pricing within one business day.
                </p>
                <Button href="/contact" variant="primary" size="lg">Request a Quote</Button>
            </div>
        </section>
    );
}
