import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Story } from '../interfaces/story.interface';
import { CreateStoryDto } from '../DTOs/create.story.dto';

@Injectable()
export class StoryService {

    constructor(
        @InjectModel('Story') private storyModel: Model<Story>,
    ) { }

    async create(createStoryDto: CreateStoryDto) {

        const createdStory = new this.storyModel(createStoryDto);
        return await createdStory.save();

    }

    async getStories() {
        return await this.storyModel.find().exec();
    }

    async getStory(storyId: string) {
        try {
            const story = await this.storyModel.findById(storyId);

            if (!story) {
                return 'Story not found';
            }
            return story;
        } catch (error) {
            return error;
        }
    }

    async updateStory(story: any) {
        try {
            const oldStory = await this.storyModel.findById(story._id);

            if (!story) {
                return 'Story not found';
            }

            story.updated_at = Date.now();

            const updatedStory = await this.storyModel.findByIdAndUpdate(
                { _id: oldStory._id },
                story,
                { upsert: true, new: true },
            );

            return [updatedStory, true];
        } catch (error) {
            return error;
        }
    }

    async deleteStory(storyId: string) {
        try {
            return await this.storyModel.findOneAndRemove(storyId);
        } catch (error) {
            return error;
        }
    }

}
