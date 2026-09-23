import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller.js";
import { AdminService } from "./admin.service.js";
import { UploadsController } from "./uploads.controller.js";
import { UploadsService } from "./uploads.service.js";

@Module({
  controllers: [AdminController, UploadsController],
  providers: [AdminService, UploadsService],
})
export class AdminModule {}
