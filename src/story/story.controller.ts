import { Controller, Post, Body, Get, Param, UseGuards, Delete } from '@nestjs/common';
import { StoryService } from './services/story.service';
import { CreateStoryDto } from './DTOs/create.story.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('story')
export class StoryController {

    constructor(private storyService: StoryService) {

    }

    @Post()
    async create(@Body() createVideoDto: CreateStoryDto) {
        return await this.storyService.create(createVideoDto);
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
