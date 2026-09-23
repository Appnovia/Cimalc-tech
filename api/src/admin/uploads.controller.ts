import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { Roles } from "@thallesp/nestjs-better-auth";
import { CreateUploadUrlDto } from "./dto/create-upload-url.dto.js";
import { UploadsService } from "./uploads.service.js";
import { ConfirmUploadDto } from "./dto/confirm-upload.dto.js";

@Roles(["ADMIN"])
@Controller("admin/uploads")
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post("presign")
  createUploadUrl(@Body() dto: CreateUploadUrlDto) {
    return this.uploadsService.createUploadUrl(dto);
  }

  @Post("confirm")
  confirmUpload(@Body() dto: ConfirmUploadDto) {
    return this.uploadsService.confirmUpload(dto);
  }

  @Delete(":key")
  deleteUpload(@Param("key") key: string) {
    return this.uploadsService.deleteUpload(key);
  }
}
