import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'login' })
  login: string;

  @ApiProperty({ example: 'password' })
  password: string;
}