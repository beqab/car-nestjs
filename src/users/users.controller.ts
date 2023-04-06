import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Delete,
  Patch,
  UseInterceptors,
  ClassSerializerInterceptor,
  Session,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import {
  SerializeInterceptor,
  Serialize,
} from "src/interceptors/serialize.interceptor";
import { AuthService } from "./auth.service";
import { CurrentUserDecorator } from "./decorators/current-user.decorator";
import { CreateUserDto } from "./dtos/createUser.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserDto } from "./dtos/user.dto";
// import { CurrentUserInterceptor } from "./interceptors/current-user.interceptor";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

@Controller("api")
// @UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService, // private authService: AuthService,
  ) {}
  @Post("signup")
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signUp(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post("singIn")
  async signIn(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password);
    console.log(session, "ddddddddddd");
    session.userId = user.id;
    return user;
  }

  @Post("signOut")
  singOut(@Session() session: any) {
    session.userId = null;
  }

  @Get("whoami")
  @UseGuards(AuthGuard)
  whoAmi(@CurrentUserDecorator() user: any) {
    return user;
  }

  @Get("/getCurrentUser")
  getCurrentUser(@Session() session: any) {
    // const  id = session.userId
    // const user = this.userService.findOne(id)
    console.log(session.userId, "session.userId");
    return this.userService.findOne(session.userId);
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  // @UseInterceptors(new SerializeInterceptor(UserDto))
  @Serialize(UserDto)
  @Get("user/:id")
  getUserById(@Param("id") id: string) {
    return this.userService.findOne(parseInt(id));
  }

  @Get("users")
  findAllUsers(@Query("email") email: string) {
    return this.userService.find(email);
  }

  @Delete("/:id")
  deleteUser(@Param("id") id: string) {
    return this.userService.remove(parseInt(id));
  }

  @Patch("/:id")
  updateUser(@Param("id") id: string, @Body() body: UpdateUserDto) {
    console.log(id, "iddd", body);
    return this.userService.update(Number(id), body);
  }
}
