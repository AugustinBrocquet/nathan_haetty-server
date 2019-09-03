import { Module } from '@nestjs/common';
import { InstagramController } from './instagram.controller';
@Module({
  exports: [],
  controllers: [InstagramController],
  providers: []
})
export class InstagramModule {}
