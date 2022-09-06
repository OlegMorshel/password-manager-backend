import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePasswordListDto } from './dto/create-password-list.dto';
import { UpdatePasswordListDto } from './dto/update-password-list.dto';
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

  async getCurrentUserLists(userId: number) {
    return await this.passwordListRepository.findAll({ where: { userId } });
  }

  async updatePasswordList(
    id: number,
    UpdatedPasswordList: UpdatePasswordListDto,
  ) {
    const selectedPasswordList = await this.passwordListRepository.findOne({
      where: { id },
    });
    if (selectedPasswordList) {
      selectedPasswordList.name = UpdatedPasswordList.name;
      await selectedPasswordList.save();
      return selectedPasswordList;
    }
    throw new HttpException('Password list not found', HttpStatus.NOT_FOUND);
  }

  async deletePasswordList(id: number) {
    const deletedPasswordList = await this.passwordListRepository.findOne({
      where: { id },
    });
    if (deletedPasswordList) {
      await deletedPasswordList.destroy();
      return deletedPasswordList;
    }
    throw new HttpException(
      "This password list doesn't exist",
      HttpStatus.NOT_FOUND,
    );
  }
}
