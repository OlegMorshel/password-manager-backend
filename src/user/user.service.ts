import {
  HttpException,
  HttpStatus,
  Injectable,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

  async updateUser(dto: UpdateUserDto, id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!!user) {
      user.first_name = dto.first_name;
      user.last_name = dto.last_name;
      user.file_id = dto.file_id;
      await user.save();
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async deleteUser(@Param('id') id: number) {
    const isExistedUser = await this.findById(id);
    if (isExistedUser) {
      return this.userRepository.destroy({ where: { id } });
    }
    throw new HttpException('This user does not exist', HttpStatus.CONFLICT);
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

  async getUserByLogin(login: string) {
    const user = this.userRepository.findOne({
      where: { login },
      include: { all: true },
    });
    if (user) return user;
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
