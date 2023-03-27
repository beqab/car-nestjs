import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(email: string, password: string) {
    // if iuser exist
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException("email in use");
    }

    // hash user

    /// generate salt
    const salt = randomBytes(8).toString("hex");

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + "." + hash.toString("hex");

    // create new user/
    const user = this.usersService.create(email, result);
    // return new user

    return user;
  }

  async signIn(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    // console.log(user);
    // return;
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const [salt, storeHash] = user.password.split(".");
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storeHash === hash.toString("hex")) {
      return user;
    } else {
      throw new BadRequestException("wrong password");
    }
  }
}
