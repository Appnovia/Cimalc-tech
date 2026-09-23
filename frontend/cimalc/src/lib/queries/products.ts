export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  detail: (slug: string) => [...productKeys.all, "detail", slug] as const,
  adminList: () => [...productKeys.all, "admin-list"] as const,
  adminDetail: (id: string) => [...productKeys.all, "admin-detail", id] as const,
  byCategory: (categorySlug: string) => [...productKeys.all, "category", categorySlug] as const,
};
