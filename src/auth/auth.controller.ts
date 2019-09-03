import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LoginUserDto } from '../users/DTOs/login-user.dto'

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {

    }

    @Post()
    async login(@Body() loginUserDto: LoginUserDto) {
        return await this.authService.validateUserByPassword(loginUserDto);
    }

}
