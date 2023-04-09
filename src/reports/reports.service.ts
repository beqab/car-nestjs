import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/user.entity";
import { Repository } from "typeorm";
import { ReportDto } from "./dtos/report.dto";
import { Report } from "./report.entity";
import { GetReport } from "./dtos/get-report.dto";

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(body: ReportDto, user: User) {
    const report = this.repo.create(body);
    report.user = user;
    return this.repo.save(report);
  }

  async findOne(id: string) {
    const report = await this.repo.findOne({ where: { id: Number(id) } });
    if (!report) {
      throw new NotFoundException("error not found");
    }

    return report;
  }

  async changeApproval(id: string, approval: boolean) {
    const report = await this.findOne(id);
    report.approved = approval;

    return this.repo.save(report);
  }

  createEstimate({ make, model, lng, lat, year, milage }: GetReport) {
    return this.repo
      .createQueryBuilder()
      .select("AVG(price)", "price")
      .where("make = :make", {
        make: make,
      })
      .andWhere("model = :model", { model })
      .andWhere("lng = :lng BETWEEN -5 AND 5", { lng })
      .andWhere("lat = :lat BETWEEN -5 AND 5", { lat })
      .andWhere("year = :year BETWEEN -3 AND 3", { year })
      .orderBy("milage - :milage", "DESC")
      .setParameters({ milage })
      .limit(3)
      .getRawOne();
  }
}
//
