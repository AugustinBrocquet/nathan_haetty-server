import { Controller, Get, Post, Body, UseGuards, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './services/posts.service';
import { CreatePostDto } from './DTOs/create-post.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from '../upload/utils/file-upload.utils';
import { diskStorage } from 'multer';

@Controller('posts')
export class PostsController {

    constructor(private postsService: PostsService) {

    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: 'picture', maxCount: 1 },
            { name: 'sub_pictures', maxCount: 20 },
        ]
        , {
            storage: diskStorage({
                destination: './resources/img',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        },
    ))
    async create(@UploadedFiles() files, @Body() createPostDto: CreatePostDto) {

        // return [files.picture, files.sub_pictures, createPostDto];

        createPostDto.picture = files.picture[0].filename;
        const pathsSubPictures = [];

        files.sub_pictures.forEach(file => {
            pathsSubPictures.push(file.filename);
        });
        createPostDto.sub_pictures = pathsSubPictures;
        // return [createPostDto];
        return await this.postsService.create(createPostDto);
    }

    @Get()
    async getPosts() {
        return await this.postsService.getPosts();
    }

    @Get('/:postId')
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
