import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'First name must be string ' })
  readonly first_name: string;
  @IsString({ message: 'Last name must be string ' })
  readonly last_name: string;
  readonly file_id: number;
}
