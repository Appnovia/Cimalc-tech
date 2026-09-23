/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Category } from "@/types/category";
import type { CategoryInput } from "@/lib/validations/category";
import { apiRequest } from "./client";

type BackendCategory = Record<string, any>;
const toSlug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
function mapCategory(item: BackendCategory): Category { return { id: String(item.id), slug: item.slug ?? toSlug(item.name), name: item.name, description: item.description }; }
function list(result: BackendCategory[] | { data?: BackendCategory[]; items?: BackendCategory[] }) { return (Array.isArray(result) ? result : result.data ?? result.items ?? []).map(mapCategory); }
export async function getCategories(): Promise<Category[]> { return list(await apiRequest<BackendCategory[] | { data?: BackendCategory[]; items?: BackendCategory[] }>("/categories")); }
export async function getAdminCategories(): Promise<Category[]> { return list(await apiRequest<BackendCategory[] | { data?: BackendCategory[]; items?: BackendCategory[] }>("/admin/categories")); }
export async function getCategoryBySlug(slug: string): Promise<Category> { return mapCategory(await apiRequest<BackendCategory>("/categories/" + slug)); }
export async function getCategoryById(id: string): Promise<Category> { return mapCategory(await apiRequest<BackendCategory>("/categories/" + id)); }
export async function createCategory(input: CategoryInput): Promise<Category> { return mapCategory(await apiRequest<BackendCategory>("/admin/categories", { method: "POST", body: JSON.stringify(input) })); }
export async function updateCategory(id: string, input: CategoryInput): Promise<Category> { return mapCategory(await apiRequest<BackendCategory>("/admin/categories/" + id, { method: "PATCH", body: JSON.stringify(input) })); }
export async function deleteCategory(id: string): Promise<void> { await apiRequest<void>("/admin/categories/" + id, { method: "DELETE" }); }

