import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PasswordListModule } from './password-list/password-list.module';
import { PasswordList } from './password-list/password-list.model';
import { PasswordItemModule } from './password-item/password-item.module';
import { PasswordItem } from './password-item/password-item.model';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, PasswordList, PasswordItem],
      autoLoadModels: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    PasswordListModule,
    PasswordItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
