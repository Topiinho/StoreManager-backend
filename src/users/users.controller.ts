import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/role.decorator';

@Controller('users')
@ApiBearerAuth('access-token')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get('list')
    async findAll (){
        return await this.userService.findAll();
    }

    @Get('find/:id')
    async findOne (@Param('id') id: number){
        return await this.userService.findOne(+id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Role('ADM')
    @Post('creat_user')
    async creat (@Body() createUserDto: CreateUserDto){
        return await this.userService.creat(createUserDto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Role('ADM')
    @Patch('update')
    async update (@Body() updateUserDto: UpdateUserDto){
        return await this.userService.update(updateUserDto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Role('ADM')
    @Delete('delete/:id')
    async delete (@Param('id') id: number){
        return await this.userService.delete(+id);
    }




}
