import { IsNumber, IsString, Length } from 'class-validator';

export class CreatePasswordListDto {
  @IsString({ message: 'Login must be string ' })
  readonly name: string;
  @IsNumber()
  readonly userId: number;
}
