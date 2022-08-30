import { IsString } from 'class-validator';

export class UpdatePasswordListDto {
  @IsString({ message: 'Name must be string ' })
  readonly name: string;
}
