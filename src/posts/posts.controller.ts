import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './services/posts.service';
import { CreatePostDto } from './DTOs/create-post.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import {
  editFileName,
  imageFileFilter,
} from '../upload/utils/file-upload.utils';
import { diskStorage } from 'multer';
import * as PromiseFtp from 'promise-ftp';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) { }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'picture', maxCount: 1 },
        { name: 'sub_pictures', maxCount: 20 },
      ],
      {
        storage: diskStorage({
          destination: './resources/img',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      },
    ),
  )
  async create(@UploadedFiles() files, @Body() createPostDto: CreatePostDto) {
    // return [files.picture, files.sub_pictures, createPostDto];

    createPostDto.picture = files.picture[0].originalname;

    const ftp = new PromiseFtp();
    ftp.connect({ host: 'ftp.cluster020.hosting.ovh.net', user: 'nathanhajh', password: 'Bhu8Nji9456' })
      .then((serverMessage) => {
        return ftp.put(`${__dirname}/../../resources/img/${files.picture[0].originalname}`, `/uploads/img/${files.picture[0].originalname}`);
      }).then(() => {
        return ftp.end();
      });
    const pathsSubPictures = [];

    if (files.sub_pictures) {
      files.sub_pictures.forEach(file => {
        pathsSubPictures.push(file.originalname);
        ftp.connect({ host: 'ftp.cluster020.hosting.ovh.net', user: 'nathanhajh', password: 'Bhu8Nji9456' })
          .then((serverMessage) => {
            return ftp.put(`${__dirname}/../../resources/img/${file.originalname}`, `/uploads/img/${file.originalname}`);
          }).then(() => {
            return ftp.end();
          });
      });
    }

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

  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'picture', maxCount: 1 },
        { name: 'sub_pictures', maxCount: 20 },
      ],
      {
        storage: diskStorage({
          destination: './resources/img',
          filename: editFileName,
        }),
      },
    ),
  )
  @Put('/update')
  @UseGuards(AuthGuard())
  async updatePost(@UploadedFiles() files, @Body() updatePostDto: any) {
    const ftp = new PromiseFtp();
    if (files.picture) {
      updatePostDto.picture = files.picture[0].originalname;

      ftp.connect({ host: 'ftp.cluster020.hosting.ovh.net', user: 'nathanhajh', password: 'Bhu8Nji9456' })
        .then((serverMessage) => {
          return ftp.put(`${__dirname}/../../resources/img/${files.picture[0].originalname}`, `/uploads/img/${files.picture[0].originalname}`);
        }).then(() => {
          return ftp.end();
        });
    }

    const pathsSubPictures = [];

    if (files.sub_pictures) {
      files.sub_pictures.forEach(file => {
        pathsSubPictures.push(file.originalname);
        ftp.connect({ host: 'ftp.cluster020.hosting.ovh.net', user: 'nathanhajh', password: 'Bhu8Nji9456' })
          .then((serverMessage) => {
            return ftp.put(`${__dirname}/../../resources/img/${file.originalname}`, `/uploads/img/${file.originalname}`);
          }).then(() => {
            return ftp.end();
          });
      });
      updatePostDto.sub_pictures = pathsSubPictures;
    }

    return await this.postsService.updatePost(updatePostDto);
  }

  @Delete('/delete/:postId')
  @UseGuards(AuthGuard())
  async deletePost(@Param('postId') postId: string) {
    return await this.postsService.deletePost(postId);
  }
  @Put('delete-subpicture')
  // @UseGuards(AuthGuard())
  async deleteSubPicture(@Body() data: any) {
    return await this.postsService.deleteSubPicture(data);
  }
}
