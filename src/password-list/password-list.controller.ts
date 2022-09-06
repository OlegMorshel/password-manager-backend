import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GetCurrentUser } from 'src/common/decorators';
import { CreatePasswordListDto } from './dto/create-password-list.dto';
import { UpdatePasswordListDto } from './dto/update-password-list.dto';
import { PasswordListService } from './password-list.service';

@Controller('password-list')
export class PasswordListController {
  constructor(private passwordListService: PasswordListService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(
    @GetCurrentUser('sub') userId: number,
    @Body() passwordList: CreatePasswordListDto,
  ) {
    return this.passwordListService.createList(passwordList, userId);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  getAll() {
    return this.passwordListService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('personal')
  getCurrentUserList(@GetCurrentUser('sub') userId: number) {
    return this.passwordListService.getCurrentUserLists(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updatePasswordList(
    @Param('id') id: number,
    @Body() updatedPasswordList: UpdatePasswordListDto,
  ) {
    return this.passwordListService.updatePasswordList(id, updatedPasswordList);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deletePasswordList(@Param('id') id: number) {
    return this.passwordListService.deletePasswordList(id);
  }
}
