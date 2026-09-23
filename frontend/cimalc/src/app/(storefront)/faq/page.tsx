const faqs = [
    { question: "How long does delivery take?", answer: "Most orders arrive within 2-3 business days within major cities." },
    { question: "How do I request a bulk quote?", answer: "Use the 'Request a Quote' button on any product page, or contact us directly." },
    { question: "What is your return policy?", answer: "We offer easy 7-day returns on all unused, unopened products." },
];

export default function FaqPage() {
    return (
        <div className="mx-auto max-w-2xl px-4 py-16 md:px-8">
            <h1 className="text-2xl font-bold text-default">Frequently Asked Questions</h1>
            <div className="mt-8 flex flex-col divide-y divide-border">
                {faqs.map((faq) => (
                    <div key={faq.question} className="py-5">
                        <p className="font-semibold text-default">{faq.question}</p>
                        <p className="mt-2 text-sm text-muted">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}