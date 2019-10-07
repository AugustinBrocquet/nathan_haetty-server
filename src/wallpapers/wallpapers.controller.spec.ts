import { Test, TestingModule } from '@nestjs/testing';
import { WallpapersController } from './wallpapers.controller';

describe('Wallpapers Controller', () => {
  let controller: WallpapersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WallpapersController],
    }).compile();

    controller = module.get<WallpapersController>(WallpapersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
