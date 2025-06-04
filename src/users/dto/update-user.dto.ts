import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '@prisma/client';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({ example: 'Marcos Macedo' })
    @IsNotEmpty({ message: 'User Required' })
    @IsString({ message: 'User has to be a string' })
    User: string;

    @ApiProperty({ example: 'Marcos Santos' })
    @IsNotEmpty({ message: 'User Required' })
    @IsString({ message: 'User has to be a string' })
    NewLogin: string;

    @ApiProperty({ example: '123456789' })
    @IsNotEmpty({ message: 'Password Required' })
    @IsString({ message: 'Password has to be a string' })
    NewPassword: string;

    @ApiProperty({ example: 'ADM or Basic'})
    @IsNotEmpty({ message: 'User Type Required'})
    UserType: UserType;
}