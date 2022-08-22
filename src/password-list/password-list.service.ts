import { Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { CreatePasswordListDto } from './dto/create-password-list.dto';
import { PasswordList } from './password-list.model';

@Injectable()
export class PasswordListService {
  constructor(
    @InjectModel(PasswordList)
    private passwordListRepository: typeof PasswordList,
  ) {}
  async createList(res: Request, createPasswordListDto: CreatePasswordListDto) {
    return await this.passwordListRepository.create({
      ...createPasswordListDto,
      userId: String(createPasswordListDto.userId),
    });
  }

  async getAll() {
    return await this.passwordListRepository.findAll();
  }
}
