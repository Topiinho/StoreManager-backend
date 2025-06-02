import { 
    Injectable,
    NotFoundException,
    UnauthorizedException,
    ConflictException
 } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService,
    ) {}


    async findAll () {
        return this.prisma.user.findMany();
    }


    async findOne (Id: number) {
        const user = await this.prisma.user.findFirst({ where: { IdUser: Id } });

        if (!user){
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async login (loginUserDto: LoginUserDto){
        const user = await this.prisma.user.findFirst({ where: { Login: loginUserDto.login } });

        console.log(user); // Adicione isto para ver o usuário retornado

        if(!user){
            throw new UnauthorizedException('Incorrect email or password!');
        }
        
        console.log(user.Password, loginUserDto.password)
        if(loginUserDto.password == user.Password){
            return {
                Message: 'Login successfully!'
            }
        } else {
            throw new UnauthorizedException('Incorrect email or password!!');
        }
    }

    async creat (createUserDto: CreateUserDto){
        if(await this.prisma.user.findFirst({ where: {Login: createUserDto.Login} })) {
            throw new ConflictException('Login already exists');
        }

        return await this.prisma.user.create({ data: createUserDto });
    }

    async update (updateUser: UpdateUserDto){
        const user = await this.prisma.user.findFirst({ where: {Login: updateUser.Login} });

        if(!user) {
            throw new NotFoundException('User not found');
        }

        return await this.prisma.user.update({
            where: {Login: updateUser.Login},
            data: updateUser
        });
    }

    async delete (Id: number){
        if(!( await this.prisma.user.findFirst({ where: {IdUser: Id} }) )){
            throw new NotFoundException('User not found')
        }

        return await this.prisma.user.delete({ where: {IdUser: Id} });
    }

}
