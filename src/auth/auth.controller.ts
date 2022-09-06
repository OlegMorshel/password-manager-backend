import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthLoginUserDto } from './dto/auth-login.dto';
import { RtGuard } from 'src/common/guards';
import { GetCurrentUser, Public } from 'src/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('registration')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  login(@Body() dto: AuthLoginUserDto) {
    return this.authService.signIn(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@GetCurrentUser('sub') userId: number) {
    return this.authService.logout(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  refreshTokens(
    @GetCurrentUser('sub') userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
