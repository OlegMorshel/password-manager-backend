import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { PasswordItemController } from './password-item.controller';
import { PasswordItem } from './password-item.model';
import { PasswordItemService } from './password-item.service';

@Module({
  controllers: [PasswordItemController],
  providers: [PasswordItemService],
  imports: [
    SequelizeModule.forFeature([PasswordItem]),
    AuthModule,
    forwardRef(() => PasswordItemModule),
  ],
  exports: [PasswordItemService],
})
export class PasswordItemModule {}
