"use client";
import Link from "next/link";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api/categories";
import { categoryKeys } from "@/lib/queries/categories";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

export function FeaturedCategories() {
  const rail = useRef<HTMLDivElement>(null);
  const { data: categories, isLoading } = useQuery({ queryKey: categoryKeys.lists(), queryFn: getCategories });
  function move(direction: number) { rail.current?.scrollBy({ left: direction * (rail.current.clientWidth * 0.8), behavior: "smooth" }); }
  const items = categories ? [...categories, ...categories] : [];
  return <section className="mx-auto max-w-[1440px] overflow-hidden px-4 py-16 md:px-8"><div className="mb-8 flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Explore by category</p></div><div className="flex items-center gap-3"><div className="flex gap-2"><button type="button" aria-label="Show previous categories" onClick={() => move(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-default transition-colors hover:bg-brand hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"><ArrowLeft className="h-4 w-4" aria-hidden="true" /></button><button type="button" aria-label="Show next categories" onClick={() => move(1)} className="grid h-11 w-11 place-items-center rounded-full bg-accent text-white transition-colors hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"><ArrowRight className="h-4 w-4" aria-hidden="true" /></button></div><Link href="/categories" className="hidden items-center gap-1 text-sm font-medium text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:flex">View all <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link></div></div>{isLoading ? <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="aspect-square w-full" />)}</div> : <div ref={rail} className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"><motion.div className="flex w-max gap-5 pr-5" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 32, ease: "linear", repeat: Infinity }} whileHover={{ animationPlayState: "paused" }}>{items.map((category, index) => <Link key={category.id + "-" + index} href={"/categories/" + category.slug} className="group flex w-[70vw] shrink-0 flex-col gap-3 focus-visible:outline-none sm:w-[42vw] md:w-[28vw] lg:w-[calc((100vw-8rem)/4)] lg:max-w-[320px]"><div className="relative aspect-square overflow-hidden rounded-md border border-border bg-background transition-shadow duration-300 group-hover:shadow-lg group-focus-visible:ring-2 group-focus-visible:ring-brand"><img src="/products/mock.png" alt="" className="h-full w-full object-cover opacity-75 transition-transform duration-500 group-hover:scale-105" /></div><span className="text-base font-semibold text-default transition-colors group-hover:text-brand">{category.name}</span></Link>)}</motion.div></div>}</section>;
}
