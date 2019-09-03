import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './services/images.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ImageSchema } from './schemas/image.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  ],
  exports: [ImagesService],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
