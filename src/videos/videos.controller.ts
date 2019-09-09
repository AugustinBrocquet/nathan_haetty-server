import { Controller, Post, Body, Get, Param, UseGuards, Delete } from '@nestjs/common';
import { VideosService } from './services/videos.service';
import { CreateVideoDto } from './DTOs/create-video.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('videos')
export class VideosController {

    constructor(private videosService: VideosService) {

    }

    @Post()
    async create(@Body() createVideoDto: CreateVideoDto) {
        return await this.videosService.create(createVideoDto);
    }

    @Get()
    async getPosts() {
        return await this.videosService.getVideos();
    }

    @Get('/:videoId')
    async getPost(@Param('videoId') videoId: string) {
        return await this.videosService.getVideo(videoId);
    }

    @Post('/update')
    @UseGuards(AuthGuard())
    async updatePost(@Body() updateVideoDto: any) {
        return await this.videosService.updateVideo(updateVideoDto);
    }

    @Delete('/delete/:videoId')
    // @UseGuards(AuthGuard())
    async deletePost(@Param('videoId') videoId: string) {
        return await this.videosService.deleteVideo(videoId);
    }

}
