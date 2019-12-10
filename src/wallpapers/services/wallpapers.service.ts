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
            const oldWallpaper = await this.wallpaperModel.findById(wallpaper._id);

            if (!oldWallpaper) {
                return 'Wallpaper not found';
            }

            wallpaper.updated_at = Date.now();

            const updatedWallpaper = await this.wallpaperModel.findByIdAndUpdate(
                { _id: oldWallpaper._id },
                wallpaper,
                { upsert: true, new: true },
            );

            return [updatedWallpaper, true];
        } catch (error) {
            return error;
        }
    }

    async deleteWallpaper(wallpaperId: string) {
        try {
            return await this.wallpaperModel.findOneAndRemove({_id: wallpaperId});
        } catch (error) {
            return error;
        }
    }

}
