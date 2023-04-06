import { Expose, Transform } from "class-transformer";

export class CreateReportDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  //   @IsLatitude()
  lng: number;

  @Expose()
  //   @IsLatitude()
  lat: number;

  @Expose()
  milage: number;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
