import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'login' })
  @IsNotEmpty({ message: 'Login Required'})
  @IsString({ message: 'login has to be a string' })
  login: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty({ message: 'Password Required' })    @IsString({ message: 'Password has to be a string' })
  password: string;
}
