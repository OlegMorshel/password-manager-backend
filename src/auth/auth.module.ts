import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategy/accessToken.strategy';
import { RefreshTokenStrategy } from './strategy/refreshToken.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    ConfigService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  imports: [forwardRef(() => UserModule), JwtModule.register({})],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
