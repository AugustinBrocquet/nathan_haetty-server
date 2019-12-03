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
    const pathsSubPictures = [];

    files.sub_pictures.forEach(file => {
      pathsSubPictures.push(file.originalname);
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

  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'picture', maxCount: 1 },
        { name: 'sub_pictures', maxCount: 20 },
      ],
      {
        fileFilter: imageFileFilter,
      },
    ),
  )
  @Put('/update')
  // @UseGuards(AuthGuard())
  async updatePost(@UploadedFiles() files, @Body() updatePostDto: any) {
    updatePostDto.picture = files.picture[0].originalname;
    const pathsSubPictures = [];

    files.sub_pictures.forEach(file => {
      pathsSubPictures.push(file.originalname);
    });
    updatePostDto.sub_pictures = pathsSubPictures;


    return await this.postsService.updatePost(updatePostDto);
  }

  @Delete('/delete/:postId')
  @UseGuards(AuthGuard())
  async deletePost(@Param('postId') postId: string) {
    return await this.postsService.deletePost(postId);
  }
}
