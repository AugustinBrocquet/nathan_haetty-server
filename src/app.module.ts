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
import { InstagramModule } from './instagram/instagram.module';
import { VideosModule } from './videos/videos.module';
import { StoryModule } from './story/story.module';
import { WallpapersModule } from './wallpapers/wallpapers.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://progadev:RashadEvans5@sandbox-pgopq.gcp.mongodb.net/test?retryWrites=true&w=majority'),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: 'smtps://contact@nathanhaetty.com:Aurorecouttet27@smtp.gmail.com',
        defaults: {
          from: '"Nathan HAETTY" <contact@nathanhaetty.com',
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
    ImagesModule,
    InstagramModule,
    VideosModule,
    StoryModule,
    WallpapersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
