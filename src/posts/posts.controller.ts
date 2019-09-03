import { Controller, Get, Post, Body, UseGuards, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './services/posts.service';
import { CreatePostDto } from './DTOs/create-post.dto';

@Controller('posts')
export class PostsController {

    constructor(private postsService: PostsService) {

    }

    @Post()
    async create(@Body() createPostDto: CreatePostDto) {
        return await this.postsService.create(createPostDto);
    }

    @Get()
    @UseGuards(AuthGuard())
    async getPosts() {
        return await this.postsService.getPosts();
    }

    @Get('/:postId')
    @UseGuards(AuthGuard())
    async getPost(@Param('postId') postId: string) {
        return await this.postsService.getPost(postId);
    }

    @Post('/update')
    @UseGuards(AuthGuard())
    async updatePost(@Body() updatePostDto: any) {
        return await this.postsService.updatePost(updatePostDto);
    }

    @Delete('/delete/:postId')
    // @UseGuards(AuthGuard())
    async deletePost(@Param('postId') postId: string) {
        return await this.postsService.deletePost(postId);
    }

}
