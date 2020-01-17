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
        return await this.postModel.find().sort({ created_at: '-1' }).exec();
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
            const oldPost = await this.postModel.findById(post.postId);

            if (!oldPost) {
                return 'Post not found';
            }

            oldPost.updated_at = Date.now();

            oldPost.title = post.title;
            oldPost.description = post.description;
            if (post.picture) {
                oldPost.picture = post.picture;
            }

            if (post.sub_pictures) {
                if (oldPost.sub_pictures.length === 0) {
                    post.sub_pictures.forEach(element => {
                        oldPost.sub_pictures.push(element);
                    });
                } else {
                    if (post.sub_pictures.length) {
                        post.sub_pictures.forEach(element => {
                            oldPost.sub_pictures.push(element);
                        });
                    }
                    /*oldPost.sub_pictures.map((element) => {
                        post.sub_pictures.filter((item) => {
        
                            if (element !== item) {
                                oldPost.sub_pictures.push(item);
                            }
                        });
                    });*/
                }
            }
            

            
            oldPost.sub_pictures = oldPost.sub_pictures.filter((elem, index, self) => {
                return index === self.indexOf(elem);
            });

            return await oldPost.save();

            // return [updatedPost, true];
        } catch (error) {
            return error;
        }
    }

    async deletePost(postId: string) {
        try {
            return await this.postModel.findOneAndRemove({_id: postId});
        } catch (error) {
            return error;
        }
    }

    async deleteSubPicture(data: any) {

        try {
            const post = await this.postModel.findById(data.postId);

            if (!post) {
                return 'Post not found';
            }

            const subPictures = post.sub_pictures.filter((item) => {
                return item !== data.filename;
            });

            post.sub_pictures = subPictures;

            return await post.save();
        } catch (error) {
            return error;
        }
    }

}
