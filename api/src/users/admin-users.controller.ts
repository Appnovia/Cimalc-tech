import { Body, Controller, Get, Param, Patch, Query } from "@nestjs/common";
import { Roles } from "@thallesp/nestjs-better-auth";
import { UpdateUserDto } from "./dto/update-user.dto.js";
import { UsersService } from "./users.service.js";

@Roles(["ADMIN"])
@Controller("admin/users")
export class AdminUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query("search") search?: string) {
    return this.usersService.findAll(search);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

 
}
