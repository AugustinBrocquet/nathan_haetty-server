import { Image } from './../interfaces/image.interface';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateImageDto } from '../DTOs/create-image.dto';

@Injectable()
export class ImagesService {

    constructor(@InjectModel('Image') private imageModel: Model<Image>) { }

    async create(createdImageDto: CreateImageDto) {

        const createdImage = new this.imageModel(createdImageDto);
        return await createdImage.save();

    }

    async getImages() {
        return await this.imageModel.find().exec();
    }

    async getImage(imageId: string) {
        try {
            const image = await this.imageModel.findById(imageId);

            if (!image) {
                return 'Image not found';
            }
            return image;
        } catch (error) {
            return error;
        }
    }

    async updateImage(image: any) {
        try {
            const oldImage = await this.imageModel.findById(image._id);

            if (!image) {
                return 'Post not found';
            }

            image.updated_at = Date.now();

            const updatedImage = await this.imageModel.findByIdAndUpdate(
                { _id: oldImage._id },
                image,
                { upsert: true, new: true },
            );

            return [updatedImage, true];
        } catch (error) {
            return error;
        }
    }

    async deleteImage(imageId: string) {
        try {
            return await this.imageModel.findOneAndRemove({_id: imageId});
        } catch (error) {
            return error;
        }
    }

}
