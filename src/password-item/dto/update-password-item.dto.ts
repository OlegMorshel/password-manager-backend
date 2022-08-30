import { IsString } from 'class-validator';

export class UpdatedPasswordItemDto {
  @IsString({ message: 'Login must be String' })
  readonly login: string;

  @IsString({ message: 'Password must be String' })
  readonly password: string;
}
