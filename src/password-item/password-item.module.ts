import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { PasswordList } from 'src/password-list/password-list.model';
import { PasswordListModule } from 'src/password-list/password-list.module';
import { PasswordItemController } from './password-item.controller';
import { PasswordItem } from './password-item.model';
import { PasswordItemService } from './password-item.service';

@Module({
  controllers: [PasswordItemController],
  providers: [PasswordItemService],
  imports: [
    SequelizeModule.forFeature([PasswordItem, PasswordList]),
    AuthModule,
    forwardRef(() => PasswordItemModule),
    forwardRef(() => PasswordListModule),
  ],
  exports: [PasswordItemService],
})
export class PasswordItemModule {}
