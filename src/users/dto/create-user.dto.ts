import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '@prisma/client';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'Marcos Macedo' })
    @IsNotEmpty({ message: 'Login Required' })
    @IsString({ message: 'login has to be a string' })
    Login: string;

    @ApiProperty({ example: 'senha123' })
    @IsNotEmpty({ message: 'Password Required' })
    @IsString({ message: 'Password has to be a string' })
    Password: string;

    @ApiProperty({ example: 'ADM or Basic'})
    @IsNotEmpty({ message: 'User Type Required'})
    UserType: UserType;

}