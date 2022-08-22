import {
  HttpException,
  HttpStatus,
  Injectable,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const newUser = await this.validateUser(dto);
    const user = await this.userRepository.create(newUser);
    return user;
  }
  async getAll() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async deleteUser(@Param('id') id: number) {
    return this.userRepository.destroy({ where: { id } });
  }

  async findById(@Param('id') id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async validateUser(user: CreateUserDto) {
    const existedUser = await this.userRepository.findOne({
      where: { login: user.login },
    });
    if (!!existedUser) {
      throw new UnauthorizedException('This login is used');
    }
    return user;
  }
}
