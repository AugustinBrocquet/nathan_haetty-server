import { CreateWallpaperDto } from './../DTOs/create-wallpaper.dto';
import { Wallpaper } from './../interfaces/wallpaper.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class WallpapersService {

    constructor(
        @InjectModel('Wallpaper') private wallpaperModel: Model<Wallpaper>,
    ) { }

    async create(createWallpaperDto: CreateWallpaperDto) {

        const createdWallpaper = new this.wallpaperModel(createWallpaperDto);
        return await createdWallpaper.save();

    }

    async getWallpapers() {
        return await this.wallpaperModel.find().exec();
    }

    async getWallpaper(wallpaperId: string) {
        try {
            const wallpaper = await this.wallpaperModel.findById(wallpaperId);

            if (!wallpaper) {
                return 'Wallpaper not found';
            }
            return wallpaper;
        } catch (error) {
            return error;
        }
    }

    async updateWallpaper(wallpaper: any) {
        try {
            console.log('id', wallpaper)
            const oldWallpaper = await this.wallpaperModel.findById(wallpaper.wallpaperId);

            if (!oldWallpaper) {
                return 'Wallpaper not found';
            }

            oldWallpaper.updated_at = Date.now();
            // oldWallpaper.title = wallpaper.title;

            oldWallpaper.path_image = wallpaper.path_image;


            return await oldWallpaper.save();

            // return [updatedPost, true];
        } catch (error) {
            return error;
        }
    }

    async deleteWallpaper(wallpaperId: string) {
        try {
            return await this.wallpaperModel.findOneAndRemove({ _id: wallpaperId });
        } catch (error) {
            return error;
        }
    }

}
