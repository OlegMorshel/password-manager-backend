import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthLoginUserDto } from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() dto: AuthLoginUserDto) {
    return this.authService.login(dto);
  }

  @Post('/registration')
  registration(@Body() dto: CreateUserDto) {
    return this.authService.registration(dto);
  }
}
