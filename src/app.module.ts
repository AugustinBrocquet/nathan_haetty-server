import { MessagesModule } from './messages/messages.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule, HandlebarsAdapter } from '@nest-modules/mailer';
import { DownloadModule } from './download/download.module';
import { PostsModule } from './posts/posts.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://progadev:RashadEvans5@sandbox-pgopq.gcp.mongodb.net/test?retryWrites=true&w=majority'),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: 'smtps://proga.404.dev@gmail.com:RashadEvans5@smtp.gmail.com',
        defaults: {
          from: '"Proga Dev" <proga.404.dev@gmail.com>',
        },
        template: {
          dir: __dirname + '/emails',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    AuthModule,
    UploadModule,
    UsersModule,
    DownloadModule,
    MessagesModule,
    PostsModule,
    ImagesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
