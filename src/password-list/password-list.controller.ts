import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JswAuthGuard } from 'src/auth/jwt-ath.guard';
import { CreatePasswordListDto } from './dto/create-password-list.dto';
import { PasswordListService } from './password-list.service';

@Controller('password-list')
export class PasswordListController {
  constructor(private passwordListService: PasswordListService) {}
  @UseGuards(JswAuthGuard)
  @Post()
  create(@Req() res: Request, @Body() passwordList: CreatePasswordListDto) {
    return this.passwordListService.createList(res, passwordList);
  }
  @Get()
  @UseGuards(JswAuthGuard)
  getAll() {
    return this.passwordListService.getAll();
  }
}
