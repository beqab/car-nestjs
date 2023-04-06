import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Query,
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
import { GetReport } from "./dtos/get-report.dto";

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

  @Get("")
  // @UseGuards(AuthGuard)
  // @Serialize(CreateReportDto)
  getReport(@Query() query: GetReport) {
    // return "opa";
    return this.reportsService.createEstimate(query);
  }
}
