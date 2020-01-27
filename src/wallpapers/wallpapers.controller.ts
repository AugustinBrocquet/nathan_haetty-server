import { CreateWallpaperDto } from './DTOs/create-wallpaper.dto';
import { WallpapersService } from './services/wallpapers.service';
import { Controller, Post, Body, Get, Param, UseGuards, Delete, UseInterceptors, UploadedFiles, Put, UploadedFile } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from '../upload/utils/file-upload.utils';
import { diskStorage } from 'multer';
import * as PromiseFtp from 'promise-ftp';


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

        const ftp = new PromiseFtp();
        ftp.connect({ host: 'ftp.cluster020.hosting.ovh.net', user: 'nathanhajh', password: 'Bhu8Nji9456' })
            .then((serverMessage) => {
                return ftp.put(`${__dirname}/../../resources/img/${files.path_image[0].filename}`, `/www/uploads/img/${files.path_image[0].filename}`);
            }).then(() => {
                return ftp.end();
            });

        return await this.wallpapersService.create(createWallpaperDto);
    }

    @Get()
    async getWallpapers() {
        return await this.wallpapersService.getWallpapers();
    }

    @Get('/:wallpaperId')
    async getWallpaper(@Param('wallpaperId') wallpaperId: string) {
        return await this.wallpapersService.getWallpaper(wallpaperId);
    }


    @Put('update')
    @UseGuards(AuthGuard())
    @UseInterceptors(
        FileInterceptor('path_image', {
            storage: diskStorage({
                destination: './resources/img',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadedFile(@UploadedFile() file, @Body() updateWallpaperDto: any) {
        // console.log('ededede');
        updateWallpaperDto.path_image = file.originalname;

        const ftp = new PromiseFtp();
        ftp.connect({ host: 'ftp.cluster020.hosting.ovh.net', user: 'nathanhajh', password: 'Bhu8Nji9456' })
            .then((serverMessage) => {
                return ftp.put(`${__dirname}/../../resources/img/${file.originalname}`, `/www/uploads/img/${file.originalname}`);
            }).then(() => {
                return ftp.end();
            });

        return await this.wallpapersService.updateWallpaper(updateWallpaperDto);
    }

    @Delete('/delete/:wallpaperId')
    @UseGuards(AuthGuard())
    async deleteWallpaper(@Param('wallpaperId') wallpaperId: string) {
        return await this.wallpapersService.deleteWallpaper(wallpaperId);
    }

}
