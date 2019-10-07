import { CreateWallpaperDto } from './DTOs/create-wallpaper.dto';
import { WallpapersService } from './services/wallpapers.service';
import { Controller, Post, Body, Get, Param, UseGuards, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from '../upload/utils/file-upload.utils';
import { diskStorage } from 'multer';


@Controller('wallpapers')
export class WallpapersController {

    constructor(private wallpapersService: WallpapersService) {

    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: 'path_image', maxCount: 1 },
        ]
        , {
            storage: diskStorage({
                destination: './resources/img',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        },
    ))
    async create(@UploadedFiles() files, @Body() createWallpaperDto: CreateWallpaperDto) {

        // return [files.path_image, createWallpaperDto];

        createWallpaperDto.path_image = files.path_image[0].filename;

        return await this.wallpapersService.create(createWallpaperDto);
    }

    @Get()
    async getPosts() {
        return await this.wallpapersService.getWallpapers();
    }

    @Get('/:wallpaperId')
    async getPost(@Param('wallpaperId') wallpaperId: string) {
        return await this.wallpapersService.getWallpaper(wallpaperId);
    }

    @Post('/update')
    @UseGuards(AuthGuard())
    async updatePost(@Body() updateWallpaperDto: any) {
        return await this.wallpapersService.updateWallpaper(updateWallpaperDto);
    }

    @Delete('/delete/:wallpaperId')
    @UseGuards(AuthGuard())
    async deletePost(@Param('wallpaperId') wallpaperId: string) {
        return await this.wallpapersService.deleteWallpaper(wallpaperId);
    }

}
