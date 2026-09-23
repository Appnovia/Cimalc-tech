import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { Roles } from "@thallesp/nestjs-better-auth";
import { CreateQuoteMessageDto } from "./dto/create-quote-message.dto.js";
import { UpdateQuoteStatusDto } from "./dto/update-quote-status.dto.js";
import { QuotesService } from "./quotes.service.js";

@Roles(["ADMIN"])
@Controller("admin/quotes")
export class AdminQuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  findAll() { return this.quotesService.findAdmin(); }

  @Get(":id")
  findOne(@Param("id") id: string) { return this.quotesService.findAdminById(id); }

  @Patch(":id/status")
  updateStatus(@Param("id") id: string, @Body() dto: UpdateQuoteStatusDto) { return this.quotesService.updateStatus(id, dto); }

  @Post(":id/messages")
  addMessage(@Param("id") id: string, @Body() dto: CreateQuoteMessageDto) { return this.quotesService.addAdminMessage(id, dto); }
}
