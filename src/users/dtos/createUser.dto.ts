import { IsEmail, IsString } from "class-validator";
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  PrimaryGeneratedColumn,
} from "typeorm";

export class CreateUserDto {
  @PrimaryGeneratedColumn()
  id: number;
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log("AfterInsert");
  }

  @AfterUpdate()
  logUpdate() {
    console.log("logUpdate");
  }

  @AfterRemove()
  logRemove() {
    console.log("logRemove");
  }
}
