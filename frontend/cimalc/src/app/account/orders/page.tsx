import { EmptyState } from "@/components/ui/empty-state";
export default function AccountOrdersPage() { return <div className="space-y-6"><h1 className="text-3xl font-bold tracking-tight">Orders</h1><EmptyState title="No orders yet" description="Accepted quotes will become orders here when ordering is connected." actionLabel="Keep browsing" actionHref="/products" /></div>; }
