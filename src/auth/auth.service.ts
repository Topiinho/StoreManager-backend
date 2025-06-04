import { 
    Injectable,
    UnauthorizedException,
 } from '@nestjs/common';
import { compare } from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    async login (loginUserDto: LoginUserDto){
        const user = await this.prisma.user.findFirst({ where: { Login: loginUserDto.login } });

        if(!user){
            throw new UnauthorizedException('Incorrect email or password!');
        }
        
        const passwordMatch = await compare(loginUserDto.password, user.Password)
        
        if(passwordMatch){
            return {
                Message: 'Login successfully!'
            }
        } else {
            throw new UnauthorizedException('Incorrect email or password!');
        }
    }


}