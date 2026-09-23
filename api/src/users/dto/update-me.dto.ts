import { IsOptional, IsString, IsUrl, MaxLength } from "class-validator";

export class UpdateMeDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;

  @IsOptional()
  @IsUrl()
  image?: string;
}
