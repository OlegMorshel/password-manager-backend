import { IsNumber, IsString } from 'class-validator';

export class CreatedPasswordItemDto {
  @IsNumber({}, { message: 'passwordListId must be a Number' })
  readonly passwordListId: string;

  @IsString({ message: 'Login must be String' })
  readonly login: string;

  @IsString({ message: 'Password must be String' })
  readonly password: string;
}
