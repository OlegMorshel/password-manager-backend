import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatedPasswordItemDto } from './dto/create-password-item.dto';
import { UpdatedPasswordItemDto } from './dto/update-password-item.dto';
import { PasswordItem } from './password-item.model';

@Injectable()
export class PasswordItemService {
  constructor(
    @InjectModel(PasswordItem)
    private passwordItemRepository: typeof PasswordItem,
  ) {}

  async getAllPasswordItems() {
    return await this.passwordItemRepository.findAll();
  }

  async createPasswordItem(createPasswordItem: CreatedPasswordItemDto) {
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
