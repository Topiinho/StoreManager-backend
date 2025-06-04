import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';


@Controller('auth')
@ApiBearerAuth('access-token')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() login: LoginUserDto) {
        return await this.authService.login(login);
    }
    
}