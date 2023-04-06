import { Exclude } from "class-transformer";
import { Report } from "src/reports/report.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @OneToMany(() => Report, report => report.user)
  report: Report[];

  @Column({ default: true })
  admin: boolean;
  @Column()
  // @Exclude()
  password: string;
}
