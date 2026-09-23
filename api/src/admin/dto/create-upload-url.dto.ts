import { IsIn, IsInt, IsOptional, IsString, MaxLength, Max } from "class-validator";

export class CreateUploadUrlDto {
  @IsString()
  @MaxLength(255)
  fileName!: string;

  @IsString()
  @IsIn(["image/jpeg", "image/png", "image/webp", "image/avif"])
  contentType!: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  folder?: string;

  @IsOptional()
  @IsString()
  productId?: string;

  @IsInt()
  @Max(10_000_000)
  size!: number;
}
