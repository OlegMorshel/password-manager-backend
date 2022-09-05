import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { AuthLoginUserDto } from './dto/auth-login.dto';
import { comparePasswords, encodePassword } from 'src/utils/bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async signUp(createUserDto: CreateUserDto): Promise<any> {
    // Check if user exists.
    const userExists = await this.usersService.getUserByLogin(
      createUserDto.login,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    // Hash password
    const hash = encodePassword(createUserDto.password);
    const newUser = await this.usersService.createUser({
      ...createUserDto,
      password: hash,
    });
    const tokens = await this.getTokens(newUser.id, newUser.first_name);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async signIn(data: AuthLoginUserDto) {
    // Check if user exists
    const user = await this.usersService.getUserByLogin(data.login);
    if (!user) throw new BadRequestException('User does not exist');
    const passwordMatches = comparePasswords(data.password, user.password);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user.id, user.first_name);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: number) {
    return await this.usersService.updateRefreshToken(userId, null);
  }

  hashData(data: string) {
    return bcrypt.hash(data, 5);
  }

  reHashData(data: string) {
    return this.jwtService.verify(data, {
      secret: process.env.JWT_ACCESS_SECRET,
    });
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.updateRefreshToken(userId, hashedRefreshToken);
  }

  async getTokens(userId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new ForbiddenException('Access Denied');
    const isMatchesTokens = bcrypt.compare(
      refreshToken,
      user.hastedRefreshToken,
    );
    if (!isMatchesTokens) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.first_name);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
