import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from '../interfaces/message.interface';
import { CreateMessageDto } from '../DTOs/create-message.dto';

@Injectable()
export class MessagesService {

    constructor(@InjectModel('Message') private messageModel: Model<Message>) { }

    async create(createMessageDto: CreateMessageDto) {

        const createdMessage = new this.messageModel(createMessageDto);
        return await createdMessage.save();

    }

    async getMessages() {
        return await this.messageModel.find().exec();
    }

}
