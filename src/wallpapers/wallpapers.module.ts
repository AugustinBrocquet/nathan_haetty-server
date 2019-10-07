import { WallpaperSchema } from './schemas/wallpaper.schema';
import { Module } from '@nestjs/common';
import { WallpapersController } from './wallpapers.controller';
import { WallpapersService } from './services/wallpapers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Wallpaper', schema: WallpaperSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  ],
  controllers: [WallpapersController],
  providers: [WallpapersService],
  exports: [WallpapersService],
})
export class WallpapersModule {}
