import { IsEnum } from "class-validator";
import { QuoteStatus } from "../../generated/prisma/client.js";

export class UpdateQuoteStatusDto {
  @IsEnum(QuoteStatus)
  status!: QuoteStatus;
}
