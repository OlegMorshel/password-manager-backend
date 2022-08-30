import { IsString } from 'class-validator';

export class CreatePasswordListDto {
  @IsString({ message: 'Login must be string ' })
  readonly name: string;
}
