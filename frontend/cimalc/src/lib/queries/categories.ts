export const categoryKeys = {
    all: ["categories"] as const,
    lists: () => [...categoryKeys.all, "list"] as const,
    detail: (slug: string) => [...categoryKeys.all, "detail", slug] as const,
    adminList: () => [...categoryKeys.all, "admin-list"] as const,
    adminDetail: (id: string) => [...categoryKeys.all, "admin-detail", id] as const,
};
