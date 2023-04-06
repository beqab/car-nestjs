import { PrimaryGeneratedColumn } from "typeorm";
import {
  IsNumber,
  IsString,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from "class-validator";
import { Expose } from "class-transformer";

export class ReportDto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNumber()
  price: number;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(2023)
  year: number;

  @IsNumber()
  //   @IsLatitude()
  lng: number;

  @IsNumber()
  //   @IsLatitude()
  lat: number;

  @Expose()
  approve: boolean;

  @IsNumber()
  @Min(0)
  @Max(100000)
  milage: number;
}
