import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../../users/DTOs/login-user.dto';
import { UsersService } from '../../users/services/users.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface.';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService) {

    }

    async validateUserByPassword(loginAttempt: LoginUserDto) {

        return new Promise(async (resolve, reject) => {

            try {
                // This will be used for the initial login
                const userToAttempt = await this.usersService.findOneByEmail(loginAttempt.email);

                // Check the supplied password against the hash stored for this email address
                userToAttempt.checkPassword(loginAttempt.password, (err, isMatch) => {

                    if (err) {
                        reject(err);
                    }

                    if (isMatch) {
                        // If there is a successful match, generate a JWT for the user
                        resolve(this.createJwtPayload(userToAttempt));

                    } else {
                        reject(err);
                    }

                });
            } catch (err) {
                reject(err);
            }

        });

    }

    async validateUserByJwt(payload: JwtPayload) {

        // This will be used when the user has already logged in and has a JWT
        const user = await this.usersService.findOneByEmail(payload.email);

        if (user) {
            return this.createJwtPayload(user);
        } else {
            throw new UnauthorizedException();
        }

    }

    createJwtPayload(user) {

        const data: JwtPayload = {
            email: user.email,
        };

        const jwt = this.jwtService.sign(data);

        return {
            status: 200,
            message: '',
            data: {
                expiresIn: 3600,
                token: jwt,
                userId: user._id,
            },
        };

    }

}
