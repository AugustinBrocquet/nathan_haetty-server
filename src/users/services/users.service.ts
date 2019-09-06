import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../DTOs/create-user.dto';
import * as crypto from 'crypto';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel('User') private userModel: Model<User>,
        private readonly mailerService: MailerService,
    ) { }

    async create(createUserDto: CreateUserDto) {

        const createdUser = new this.userModel(createUserDto);
        return await createdUser.save();

    }

    async getUsers() {
        return await this.userModel.find().exec();
    }

    async findOneByEmail(email): Model<User> {

        return await this.userModel.findOne({ email: email });

    }

    async generatePasswordResetEmail(email: string) {

        try {

            const user = await this.userModel.findOne({ email: email });

            if (!user) {
                return 'User not found';
            }

            const buffer = await crypto.randomBytes(20);
            const token = buffer.toString('hex');

            const updatedUser = await this.userModel.findByIdAndUpdate(
                { _id: user._id },
                {
                    reset_password_token: token,
                    reset_password_expires: Date.now() + 86400000,
                    updated_at: Date.now(),
                },
                { upsert: true, new: true },
            );

            // Email
            const emailResponse = await this
                .mailerService
                .sendMail({
                    to: 'augustin.brocquet@gmail.com',
                    from: 'noreply@nestjs.com',
                    subject: 'Testing Nest MailerModule ✔',
                    text: `welcome ${token}`,
                    html: `<b>welcome ${token}</b>`,
                });

            return [updatedUser, emailResponse, token];

        } catch (error) {
            return error;
        }

    }

    async checkPasswordResetToken(token: string) {

        try {
            const user = await this.userModel.findOne({ reset_password_token: token });

            if (!user) {
                return `Token : ${token} not found !`;
            }

            const compareDate = (date0: Date, date1: Date) => {
                return (date0 <= date1) ? true : false;
            };

            if (!compareDate) {
                return `Token ${token} has expired !`;
            }

            return true;
        } catch (error) {
            return error;
        }

    }

    async resetPassword(token: string, password: string, confirmPassword: string) {

        console.log(password +' '+confirmPassword)
        try {
            if (password !== confirmPassword) {
                return 'password and confirm password do not match';
            }

            const user = await this.userModel.findOne({ reset_password_token: token });

            if (!user) {
                return `Empty user associated with token ${token}`;
            }

            user.password = password;

            return await user.save();
        } catch (error) {
            return error;
        }


    }

}
