import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CategoryForm } from "@/components/admin/category-form";
export default function NewCategoryPage() { return <div className="space-y-6"><Breadcrumb items={[{ label: "Admin", href: "/admin" }, { label: "Categories", href: "/admin/categories" }, { label: "New category" }]} /><div><h1 className="text-3xl font-bold tracking-tight">Add category</h1><p className="mt-2 text-sm text-muted">Create a clean navigation layer for the storefront.</p></div><CategoryForm /></div>; }
