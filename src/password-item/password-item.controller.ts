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
import { CreatedPasswordItemDto } from './dto/create-password-item.dto';
import { UpdatedPasswordItemDto } from './dto/update-password-item.dto';
import { PasswordItemService } from './password-item.service';

@Controller('password-item')
export class PasswordItemController {
  constructor(private passwordItemService: PasswordItemService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getAllPasswordItems() {
    return this.passwordItemService.getAllPasswordItems();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getDifferentPasswordListItems(@Param('id') passwordListId: number) {
    return this.passwordItemService.getDifferentPasswordListItems(
      passwordListId,
    );
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createPasswordItem(@Body() createdPasswordItem: CreatedPasswordItemDto) {
    return this.passwordItemService.createPasswordItem(createdPasswordItem);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updatePasswordItem(
    @Param('id') id: string,
    @Body() updatedPasswordItem: UpdatedPasswordItemDto,
  ) {
    return this.passwordItemService.updatePasswordItem(
      +id,
      updatedPasswordItem,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deletePasswordItem(@Param('id') id: string) {
    return this.passwordItemService.deletePasswordItem(+id);
  }
}
