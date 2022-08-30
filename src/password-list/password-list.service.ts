import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePasswordListDto } from './dto/create-password-list.dto';
import { PasswordList } from './password-list.model';

@Injectable()
export class PasswordListService {
  constructor(
    @InjectModel(PasswordList)
    private passwordListRepository: typeof PasswordList,
  ) {}
  async createList(
    createPasswordListDto: CreatePasswordListDto,
    userId: number,
  ) {
    return await this.passwordListRepository.create({
      ...createPasswordListDto,
      userId: String(userId),
    });
  }

  async getAll() {
    return await this.passwordListRepository.findAll();
  }
}
