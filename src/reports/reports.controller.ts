import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { Serialize } from "src/interceptors/serialize.interceptor";
import { CurrentUserDecorator } from "src/users/decorators/current-user.decorator";
import { User } from "src/users/user.entity";
import { ApproveReportDto } from "./dtos/approve-report.dto";
import { CreateReportDto } from "./dtos/create-report.dto";
import { ReportDto } from "./dtos/report.dto";
import { ReportsService } from "./reports.service";
import { AdminGuard } from "src/guards/admin.guard";

@Controller("reports")
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
  @Post("/")
  @UseGuards(AuthGuard)
  @Serialize(CreateReportDto)
  createReport(@Body() body: ReportDto, @CurrentUserDecorator() user: User) {
    return this.reportsService.create(body, user);
  }

  @Patch("/:id")
  @UseGuards(AdminGuard)
  approveReport(@Param("id") id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(id, body.approve);
  }
}
