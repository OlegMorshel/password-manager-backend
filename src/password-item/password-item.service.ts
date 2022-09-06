import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PasswordList } from 'src/password-list/password-list.model';
import { Repository } from 'typeorm';
import { CreatedPasswordItemDto } from './dto/create-password-item.dto';
import { UpdatedPasswordItemDto } from './dto/update-password-item.dto';
import { PasswordItem } from './password-item.model';

@Injectable()
export class PasswordItemService {
  constructor(
    @InjectModel(PasswordItem)
    private passwordItemRepository: typeof PasswordItem,
    @InjectModel(PasswordList)
    private passwordListRepository: Repository<PasswordList>,
  ) {}

  async getAllPasswordItems() {
    return await this.passwordItemRepository.findAll();
  }

  async getDifferentPasswordListItems(passwordListId: number) {
    const PasswordList = await this.passwordListRepository.findOne({
      where: { id: passwordListId },
    });
    if (!PasswordList)
      throw new HttpException(
        'Password list id is not exist',
        HttpStatus.NOT_FOUND,
      );
    return await this.passwordItemRepository.findAll({
      where: { passwordListId },
    });
  }

  async createPasswordItem(createPasswordItem: CreatedPasswordItemDto) {
    const IsExistPasswordList = await this.passwordListRepository.findOne({
      where: { id: +createPasswordItem.passwordListId },
    });
    if (!IsExistPasswordList)
      throw new HttpException(
        'Password list id is not exist',
        HttpStatus.NOT_FOUND,
      );
    return await this.passwordItemRepository.create(createPasswordItem);
  }

  async updatePasswordItem(
    id: number,
    updatedPasswordItem: UpdatedPasswordItemDto,
  ) {
    const selectedPasswordItem = await this.passwordItemRepository.findOne({
      where: { id },
    });
    if (selectedPasswordItem) {
      (selectedPasswordItem.login = updatedPasswordItem.login),
        (selectedPasswordItem.password = updatedPasswordItem.password),
        await selectedPasswordItem.save();
      return selectedPasswordItem;
    }
    throw new HttpException('Password item not found', HttpStatus.NOT_FOUND);
  }

  async deletePasswordItem(id: number) {
    const deletedPasswordItem = await this.passwordItemRepository.findOne({
      where: { id },
    });
    if (deletedPasswordItem) {
      await deletedPasswordItem.destroy();
      return deletedPasswordItem;
    }
    throw new HttpException('Password item not found', HttpStatus.NOT_FOUND);
  }
}
