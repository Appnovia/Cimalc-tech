"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { QuantityStepper } from "./quantity-stepper";
import { submitQuoteRequest } from "@/lib/api/qoutes";
import { QuoteRequestInput, quoteRequestSchema } from "@/lib/validations/qoute";
import { Button } from "../ui/botton";

interface RequestQuoteDialogProps { isOpen: boolean; onClose: () => void; productId: string; productName: string; }

export function RequestQuoteDialog({ isOpen, onClose, productId, productName }: RequestQuoteDialogProps) {
    const [quantity, setQuantity] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<QuoteRequestInput>({ resolver: zodResolver(quoteRequestSchema) });
    const close = () => { setIsSubmitted(false); onClose(); };
    async function onSubmit(data: QuoteRequestInput) { try { await submitQuoteRequest(productId, { ...data, quantity }); toast.success("Quote request sent â€” we'll be in touch shortly."); reset(); setIsSubmitted(true); } catch { toast.error("Something went wrong. Please try again."); } }
    return <Dialog isOpen={isOpen} onClose={close} title={isSubmitted ? "Quote request received" : `Request a quote â€” ${productName}`}>
        {isSubmitted ? <div className="flex flex-col items-center gap-4 py-4 text-center"><CheckCircle2 className="h-12 w-12 text-success" aria-hidden="true" /><div><p className="font-semibold text-default">Weâ€™re reviewing your request.</p><p className="mt-2 text-sm leading-6 text-muted">Keep exploring Cimalc Tech while our team prepares your personalized response.</p></div><div className="flex w-full flex-col gap-3 pt-2 sm:flex-row"><Button href="/products" className="flex-1" onClick={close}>Continue shopping</Button><Link href="/contact" onClick={close} className="inline-flex min-h-11 flex-1 items-center justify-center rounded-sm border border-brand px-5 text-sm font-medium text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">Contact support</Link></div></div> : <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4"><Input label="Full name" error={errors.name?.message} {...register("name")} /><Input label="Email" type="email" error={errors.email?.message} {...register("email")} /><Input label="Phone (optional)" {...register("phone")} /><div className="flex flex-col gap-2"><span className="text-sm font-medium text-default">Quantity</span><QuantityStepper value={quantity} onChange={setQuantity} /></div><div className="flex flex-col gap-2"><label htmlFor="message" className="text-sm font-medium text-default">Message (optional)</label><textarea id="message" rows={3} className="rounded-sm border border-border bg-surface px-4 py-3 text-sm text-default placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand" {...register("message")} /></div><Button type="submit" isLoading={isSubmitting} className="mt-2">Submit request</Button></form>}
    </Dialog>;
}

