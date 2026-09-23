import { IsEmail, IsInt, IsOptional, IsString, MaxLength, Min } from "class-validator";

export class CreateQuoteDto {
  @IsString()
  @MaxLength(120)
  customerName!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  phone?: string;

  @IsString()
  productId!: string;

  @IsInt()
  @Min(1)
  quantity!: number;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  message?: string;
}
