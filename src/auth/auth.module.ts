import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller'
import { PrismaService } from '../database/prisma.service';
import { AuthService } from './auth.service';


@Module({
    controllers: [AuthController],
    providers: [AuthService, PrismaService],
    exports: [AuthService]
})

export class AuthModule {}