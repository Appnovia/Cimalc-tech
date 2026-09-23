import { apiRequest } from "./client";
export interface AdminStats { totalUsers: number; totalProducts: number; publishedProducts: number; draftProducts: number; totalCategories: number; pendingQuotes: number; acceptedQuotes: number; }
export function getAdminStats() { return apiRequest<AdminStats>("/admin/stats"); }
