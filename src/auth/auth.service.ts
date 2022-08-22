import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/user.model';
import { AuthLoginUserDto } from './dto/auth-login.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: AuthLoginUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByLogin(userDto.login);
    if (candidate) {
      throw new HttpException(
        'This login is used other person',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = {
      name: user.first_name,
      surname: user.last_name,
      id: user.id,
    };

    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(userDto: AuthLoginUserDto) {
    const user = await this.userService.getUserByLogin(userDto.login);
    console.log('user', user.password);
    console.log('userDto ', userDto.password);
    const passwordEqual = await bcrypt.compare(userDto.password, user.password);
    console.log('passwordEqual ', passwordEqual);
    if (user && passwordEqual) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Login or password do not correct',
    });
  }
}
