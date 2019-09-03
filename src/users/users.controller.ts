import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './DTOs/create-user.dto';
import { UsersService } from './services/users.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {

    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto);
    }

    @Get()
    @UseGuards(AuthGuard())
    async getUsers() {
        return await this.usersService.getUsers();
    }

    @Post('auth/request-password')
    async generatePasswordResetEmail(@Body('email') email: string) {
        return await this.usersService.generatePasswordResetEmail(email);
    }

    @Post('auth/check-request-password-token')
    async checkPasswordResetToken(@Body('token') token: string) {
        return await this.usersService.checkPasswordResetToken(token);
    }

    @Post('auth/reset-password')
    async resetPassword(
        @Body('token') token: string,
        @Body('password') password: string,
        @Body('confirm_password') confirmPassword: string,
    ) {
        return await this.usersService.resetPassword(token, password, confirmPassword);
    }

}
