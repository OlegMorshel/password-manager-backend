import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreatePasswordListDto } from './dto/create-password-list.dto';
import { PasswordListService } from './password-list.service';

@Controller('password-list')
export class PasswordListController {
  constructor(private passwordListService: PasswordListService) {}
  @Post()
  create(@Req() res: Request, @Body() passwordList: CreatePasswordListDto) {
    return this.passwordListService.createList(res, passwordList);
  }

  @Get()
  getAll() {
    return this.passwordListService.getAll();
  }
}
