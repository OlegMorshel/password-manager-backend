import { IsString } from 'class-validator';

export class CreatePasswordListDto {
  @IsString({ message: 'Name must be string ' })
  readonly name: string;
}
