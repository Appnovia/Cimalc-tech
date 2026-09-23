import { Injectable, NotFoundException } from "@nestjs/common";
import {
  AuthService,
  type UserSession,
} from "@thallesp/nestjs-better-auth";
import type { auth } from "../auth/auth.js";
import { UpdateUserDto } from "./dto/update-user.dto.js";
import { UpdateMeDto } from "./dto/update-me.dto.js";
import { PrismaService } from "../prisma/prisma.service.js";

@Injectable()
export class UsersService {
  constructor( private readonly authService: AuthService<typeof auth>, private readonly prisma: PrismaService, ) {}

  getMe(session: UserSession<typeof auth>) {
    return session.user;
  }

  updateMe(id: string, dto: UpdateMeDto) {
    return this.prisma.user.update({
      where: { id },
      data: dto,
      select: this.publicUserSelect,
    });
  }

  findAll(search?: string) {
    return this.prisma.user.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined,
      orderBy: { createdAt: "desc" },
      select: this.publicUserSelect,
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: this.publicUserSelect,
    });
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findOne(id);
    return this.prisma.user.update({
      where: { id },
      data: dto,
      select: this.publicUserSelect,
    });
  }

  private readonly publicUserSelect = {
    id: true,
    name: true,
    email: true,
    image: true,
    role: true,
    createdAt: true,
    updatedAt: true,
  } as const;
}
