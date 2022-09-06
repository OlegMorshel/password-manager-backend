import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { GetCurrentUser, Public } from 'src/common/decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Put()
  updateUser(
    @GetCurrentUser('sub') userId: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.updateUser(dto, userId);
  }

  @HttpCode(HttpStatus.OK)
  @Delete()
  deleteUser(@GetCurrentUser('sub') userId: number) {
    return this.userService.deleteUser(userId);
  }
}
