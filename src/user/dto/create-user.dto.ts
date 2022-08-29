import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'First name must be string ' })
  readonly first_name: string;
  @IsString({ message: 'Last name must be string ' })
  readonly last_name: string;
  @IsString({ message: 'Login must be string ' })
  readonly login: string;
  @IsString({ message: 'Password must be string ' })
  @Length(4, 16, { message: 'More than 4 and less 16 symbols length' })
  readonly password: string;
}
