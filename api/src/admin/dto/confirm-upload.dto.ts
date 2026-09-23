import { IsIn, IsInt, IsString, Max } from "class-validator";

export class ConfirmUploadDto {
  @IsString()
  key!: string;

  @IsString()
  publicUrl!: string;

  @IsIn(["image/jpeg", "image/png", "image/webp", "image/avif"])
  contentType!: string;

  @IsInt()
  @Max(10_000_000)
  size!: number;
}
