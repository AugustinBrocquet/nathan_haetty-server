import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video } from 'src/videos/interfaces/video.interface';
import { CreateVideoDto } from 'src/videos/DTOs/create-video.dto';

@Injectable()
export class VideosService {

    constructor(
        @InjectModel('Video') private videoModel: Model<Video>,
    ) { }

    async create(createVideoDto: CreateVideoDto) {

        const createdVideo = new this.videoModel(createVideoDto);
        return await createdVideo.save();

    }

    async getVideos() {
        return await this.videoModel.find().exec();
    }

    async getVideo(videoId: string) {
        try {
            const video = await this.videoModel.findById(videoId);

            if (!video) {
                return 'Video not found';
            }
            return video;
        } catch (error) {
            return error;
        }
    }

    async updateVideo(video: any) {
        try {
            const oldVideo = await this.videoModel.findById(video._id);

            if (!video) {
                return 'Post not found';
            }

            video.updated_at = Date.now();

            const updatedVideo = await this.videoModel.findByIdAndUpdate(
                { _id: oldVideo._id },
                video,
                { upsert: true, new: true },
            );

            return [updatedVideo, true];
        } catch (error) {
            return error;
        }
    }

    async deleteVideo(videoId: string) {
        try {
            return await this.videoModel.findOneAndRemove(videoId);
        } catch (error) {
            return error;
        }
    }

}
