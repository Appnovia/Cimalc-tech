import { Module } from "@nestjs/common";
import { MeController, UsersController } from "./users.controller.js";
import { AdminUsersController } from "./admin-users.controller.js";
import { UsersService } from "./users.service.js";

@Module({
  controllers: [UsersController, MeController, AdminUsersController],
  providers: [UsersService],
})
export class UsersModule {}
