import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString({ message: 'Refresh token must be string ' })
  readonly refresh_token: string;
}
