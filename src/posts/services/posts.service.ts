import { Post } from './../interfaces/post.interface';
import { CreatePostDto } from './../DTOs/create-post.dto';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostsService {

    constructor(@InjectModel('Post') private postModel: Model<Post>) { }

    async create(createPostDto: CreatePostDto) {

        const createdPost = new this.postModel(createPostDto);
        return await createdPost.save();

    }

    async getPosts() {
        return await this.postModel.find().sort({created_at: '-1'}).exec();
    }

    async getPost(postId: string) {
        try {
            const post = await this.postModel.findById(postId);

            if (!post) {
                return 'Post not found';
            }
            return post;
        } catch (error) {
            return error;
        }
    }

    async updatePost(post: any) {
        try {
            const oldPost = await this.postModel.findById(post._id);

            if (!post) {
                return 'Post not found';
            }

            post.updated_at = Date.now();

            const updatedPost = await this.postModel.findByIdAndUpdate(
                { _id: oldPost._id },
                post,
                { upsert: true, new: true },
            );

            return [updatedPost, true];
        } catch (error) {
            return error;
        }
    }

    async deletePost(postId: string) {
        try {
            return await this.postModel.findOneAndRemove(postId);
        } catch (error) {
            return error;
        }
    }

}
