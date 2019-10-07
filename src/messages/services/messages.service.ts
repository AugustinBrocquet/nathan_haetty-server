import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from '../interfaces/message.interface';
import { CreateMessageDto } from '../DTOs/create-message.dto';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class MessagesService {

    constructor(@InjectModel('Message') private messageModel: Model<Message>, private readonly mailerService: MailerService) { }

    async create(createMessageDto: CreateMessageDto) {

        const createdMessage = new this.messageModel(createMessageDto);
        await createdMessage.save();
        const emailResponse = await this
            .mailerService
            .sendMail({
                to: 'augustin.brocquet@gmail.com',
                from: 'noreply@nestjs.com',
                subject: 'Nouveau Message NathanHaetty.com✔',
                text: `Bonjour, vous avez reçu un nouveau message : ${createdMessage.content}`,
                html: `Bonjour, vous avez reçu un nouveau message :<br /> ${createdMessage.content}`,
            });

        return [createdMessage, emailResponse];

    }

    async getMessages() {
        return await this.messageModel.find().exec();
    }

}
