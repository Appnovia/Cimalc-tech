import { IsEnum, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";
import { UserRole } from "../../generated/prisma/client.js";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;

  @IsOptional()
  @IsUrl()
  image?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
