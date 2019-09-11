import { Controller, Post, Body, Get, Param, UseGuards, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { StoryService } from './services/story.service';
import { CreateStoryDto } from './DTOs/create.story.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from '../upload/utils/file-upload.utils';
import { diskStorage } from 'multer';

@Controller('story')
export class StoryController {

    constructor(private storyService: StoryService) {

    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: 'image', maxCount: 1 },
        ]
        , {
            storage: diskStorage({
                destination: './resources/img',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        },
    ))
    async create(@UploadedFiles() files, @Body() createStoryDto: CreateStoryDto) {
        createStoryDto.image = files.image[0].filename;
        return await this.storyService.create(createStoryDto);
    }

    @Get()
    async getPosts() {
        return await this.storyService.getStories();
    }

    @Get('/:storyId')
    async getPost(@Param('storyId') videoId: string) {
        return await this.storyService.getStory(videoId);
    }

    @Post('/update')
    @UseGuards(AuthGuard())
    async updatePost(@Body() updateVideoDto: any) {
        return await this.storyService.updateStory(updateVideoDto);
    }

    @Delete('/delete/:storyId')
    // @UseGuards(AuthGuard())
    async deletePost(@Param('videoId') videoId: string) {
        return await this.storyService.deleteStory(videoId);
    }

}
