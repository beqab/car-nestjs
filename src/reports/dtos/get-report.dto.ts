import { Expose, Transform } from "class-transformer";
import {
  IsNumber,
  IsString,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
  IsBoolean,
} from "class-validator";

export class GetReport {
  @Expose()
  id: number;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1930)
  @Max(2023)
  year: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  //   @IsLatitude()
  lng: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  //   @IsLatitude()
  lat: number;

  @Transform(({ value }) => !!value)
  @IsBoolean()
  approve: boolean;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  @Max(100000)
  milage: number;
}
