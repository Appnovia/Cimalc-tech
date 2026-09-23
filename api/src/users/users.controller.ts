import { Controller, Get, Patch, Body, Param } from "@nestjs/common";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { auth } from "../auth/auth.js";
import { UsersService } from "./users.service.js";
import { UpdateUserDto } from "./dto/update-user.dto.js";
import { UpdateMeDto } from "./dto/update-me.dto.js";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  getMe(@Session() session: UserSession<typeof auth>) {
    return this.usersService.getMe(session);
  }


   @Patch(":id/update")
  update(@Param("id") id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }
}

@Controller("me")
export class MeController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getMe(@Session() session: UserSession<typeof auth>) {
    return this.usersService.getMe(session);
  }

  @Patch()
  updateMe(@Session() session: UserSession<typeof auth>, @Body() dto: UpdateMeDto) {
    return this.usersService.updateMe(session.user.id, dto);
  }
}
