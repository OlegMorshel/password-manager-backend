import { IsString, Length } from 'class-validator';

export class AuthLoginUserDto {
  @IsString({ message: 'Login must be string ' })
  readonly login: string;
  @IsString({ message: 'Password must be string ' })
  @Length(4, 16, { message: 'More than 4 and less 16 symbols length' })
  readonly password: string;
}
