import { 
    Injectable,
    NotFoundException,
    ConflictException
} from '@nestjs/common';
import { hash } from 'bcrypt'
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

    async creat (createUserDto: CreateUserDto){
        if(await this.prisma.user.findFirst({ where: {Login: createUserDto.Login} })) {
            throw new ConflictException('Login already exists');
        }

        const saltRounds = 10;
        const hashedPassword = await hash(createUserDto.Password, saltRounds);

        return await this.prisma.user.create({ data: {
            Login: createUserDto.Login,
            Password: hashedPassword,
            UserType: createUserDto.UserType
        }});
    }

    async update (updateUser: UpdateUserDto){
        const user = await this.prisma.user.findFirst({ where: {Login: updateUser.User} });

        if(!user) {
            throw new NotFoundException('User not found');
        }

        const saltRounds = 10;
        const hashedPassword = await hash(updateUser.NewPassword, saltRounds);

        return await this.prisma.user.update({
            where: {Login: updateUser.User},
            data: {
                Login: updateUser.NewLogin,
                Password: hashedPassword,
                UserType: updateUser.UserType
            }
        });
    }

    async delete (Id: number){
        if(!( await this.prisma.user.findFirst({ where: {IdUser: Id} }) )){
            throw new NotFoundException('User not found')
        }

        return await this.prisma.user.delete({ where: {IdUser: Id} });
    }

}
