import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateMessageDto } from './DTOs/create-message.dto';
import { AuthGuard } from '@nestjs/passport';
import { MessagesService } from './services/messages.service';

@Controller('messages')
export class MessagesController {
    constructor(private messagesService: MessagesService) {

    }

    @Post()
    @UseGuards(AuthGuard())
    async create(@Body() createUserDto: CreateMessageDto) {
        return await this.messagesService.create(createUserDto);
    }

    @Get()
    @UseGuards(AuthGuard())
    async getMessages() {
        return await this.messagesService.getMessages();
    }

}
