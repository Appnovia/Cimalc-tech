import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { OptionalAuth, Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { auth } from "../auth/auth.js";
import { CreateQuoteDto } from "./dto/create-quote.dto.js";
import { CreateQuoteMessageDto } from "./dto/create-quote-message.dto.js";
import { QuotesService } from "./quotes.service.js";

@Controller("quotes")
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  @OptionalAuth()
  create(@Body() dto: CreateQuoteDto, @Session() session?: UserSession<typeof auth>) {
    return this.quotesService.create(dto, session?.user.id);
  }

  @Get()
  findMine(@Session() session: UserSession<typeof auth>) {
    return this.quotesService.findMine(session.user.id);
  }

  @Get(":id")
  findOne(@Param("id") id: string, @Session() session: UserSession<typeof auth>) {
    return this.quotesService.findMineById(session.user.id, id);
  }

  @Patch(":id/cancel")
  cancel(@Param("id") id: string, @Session() session: UserSession<typeof auth>) {
    return this.quotesService.cancel(session.user.id, id);
  }

  @Post(":id/messages")
  addMessage(@Param("id") id: string, @Body() dto: CreateQuoteMessageDto, @Session() session: UserSession<typeof auth>) {
    return this.quotesService.addMessage(session.user.id, id, dto);
  }
}
