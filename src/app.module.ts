import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PasswordListModule } from './password-list/password-list.module';
import { PasswordList } from './password-list/password-list.model';
import { UserService } from './user/user.service';
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
      models: [User, PasswordList],
      autoLoadModels: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    PasswordListModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
