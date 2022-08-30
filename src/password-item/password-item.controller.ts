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
import { JswAuthGuard } from 'src/auth/jwt-ath.guard';
import { CreatedPasswordItemDto } from './dto/create-password-item.dto';
import { UpdatedPasswordItemDto } from './dto/update-password-item.dto';
import { PasswordItemService } from './password-item.service';

@Controller('password-item')
export class PasswordItemController {
  constructor(private passwordItemService: PasswordItemService) {}

  @Get()
  @UseGuards(JswAuthGuard)
  @UsePipes(new ValidationPipe())
  getAllPasswordItems() {
    return this.passwordItemService.getAllPasswordItems();
  }

  @Post()
  @UseGuards(JswAuthGuard)
  @UsePipes(new ValidationPipe())
  createPasswordItem(@Body() createdPasswordItem: CreatedPasswordItemDto) {
    return this.passwordItemService.createPasswordItem(createdPasswordItem);
  }

  @Put(':id')
  @UseGuards(JswAuthGuard)
  @UsePipes(new ValidationPipe())
  updatePasswordItem(
    @Param('id') id: string,
    @Body() updatedPasswordItem: UpdatedPasswordItemDto,
  ) {
    return this.passwordItemService.updatePasswordItem(
      +id,
      updatedPasswordItem,
    );
  }

  @Delete(':id')
  @UseGuards(JswAuthGuard)
  @UsePipes(new ValidationPipe())
  deletePasswordItem(@Param('id') id: string) {
    return this.passwordItemService.deletePasswordItem(+id);
  }
}
