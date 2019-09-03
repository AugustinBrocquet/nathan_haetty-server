import { Controller, Get, Post, Body, UseGuards, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ImagesService } from './services/images.service';
import { CreateImageDto } from './DTOs/create-image.dto';


@Controller('images')
export class ImagesController {

    constructor(private imagesService: ImagesService) {

    }

    @Post()
    async create(@Body() createImageDto: CreateImageDto) {
        return await this.imagesService.create(createImageDto);
    }

    @Get()
    @UseGuards(AuthGuard())
    async getImages() {
        return await this.imagesService.getImages();
    }

    @Get('/:imageId')
    @UseGuards(AuthGuard())
    async getImage(@Param('imageId') imageId: string) {
        return await this.imagesService.getImage(imageId);
    }

    @Post('/update')
    @UseGuards(AuthGuard())
    async updateImage(@Body() updateImageDto: any) {
        return await this.imagesService.updateImage(updateImageDto);
    }

    @Delete('/delete/:imageId')
    // @UseGuards(AuthGuard())
    async deleteImage(@Param('imageId') imageId: string) {
        return await this.imagesService.deleteImage(imageId);
    }

}
