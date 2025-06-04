import { 
    Injectable,
    UnauthorizedException,
 } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
import { access } from 'fs';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    async login (loginUserDto: LoginUserDto){
        const user = await this.prisma.user.findFirst({ where: { Login: loginUserDto.login } });

        if(!user){
            throw new UnauthorizedException('Incorrect email or password!');
        }
        
        const passwordMatch = await compare(loginUserDto.password, user.Password)
        
        if(passwordMatch){
            const payload = {sub: user.IdUser, login: user.Login, userType: user.UserType};
            const token = this.jwtService.sign(payload)

            return {
                access_token: token,
                Message: 'Login successfully!'
            }
        } else {
            throw new UnauthorizedException('Incorrect email or password!');
        }
    }


}