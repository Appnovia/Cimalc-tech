import { Module } from "@nestjs/common";
import { AdminQuotesController } from "./admin-quotes.controller.js";
import { QuotesController } from "./quotes.controller.js";
import { QuotesService } from "./quotes.service.js";
import { MeQuotesController } from "./me-quotes.controller.js";

@Module({
  controllers: [QuotesController, MeQuotesController, AdminQuotesController],
  providers: [QuotesService],
})
export class QuotesModule {}
