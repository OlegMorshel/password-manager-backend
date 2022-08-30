import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { PasswordListController } from './password-list.controller';
import { PasswordList } from './password-list.model';
import { PasswordListService } from './password-list.service';

@Module({
  controllers: [PasswordListController],
  providers: [PasswordListService],
  imports: [SequelizeModule.forFeature([PasswordList]), UserModule, AuthModule],
})
export class PasswordListModule {}
