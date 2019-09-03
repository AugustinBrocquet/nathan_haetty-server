import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { MessagesController } from './messages.controller';
import { MessagesService } from './services/messages.service';
import { MessageSchema } from './schemas/message.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
        PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    ],
    exports: [MessagesService],
    controllers: [MessagesController],
    providers: [MessagesService],
})
export class MessagesModule { }
