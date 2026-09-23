import { Controller, Get } from "@nestjs/common";
import { Roles } from "@thallesp/nestjs-better-auth";
import { AdminService } from "./admin.service.js";

@Roles(["ADMIN"])
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("dashboard/stats")
  getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Get("stats")
  getStats() {
    return this.adminService.getDashboardStats();
  }
}
