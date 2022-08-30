import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JswAuthGuard } from 'src/auth/jwt-ath.guard';
import { UserDecorator } from 'src/user/user.decorator';
import { User } from 'src/user/user.model';
import { CreatePasswordListDto } from './dto/create-password-list.dto';
import { UpdatePasswordListDto } from './dto/update-password-list.dto';
import { PasswordListService } from './password-list.service';

@Controller('password-list')
export class PasswordListController {
  constructor(
    private passwordListService: PasswordListService,
    private authService: AuthService,
  ) {}
  @UseGuards(JswAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  create(
    @UserDecorator('id') user: User,
    @Body() passwordList: CreatePasswordListDto,
  ) {
    return this.passwordListService.createList(passwordList, user.id);
  }
  @Get()
  @UseGuards(JswAuthGuard)
  getAll() {
    return this.passwordListService.getAll();
  }

  @Put(':id')
  @UseGuards(JswAuthGuard)
  updatePasswordList(
    @Param('id') id: number,
    @Body() updatedPasswordList: UpdatePasswordListDto,
  ) {
    return this.passwordListService.updatePasswordList(id, updatedPasswordList);
  }

  @Delete(':id')
  @UseGuards(JswAuthGuard)
  deletePasswordList(@Param('id') id: number) {
    return this.passwordListService.deletePasswordList(id);
  }
}
