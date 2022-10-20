import { Test, TestingModule } from '@nestjs/testing';
import { AppearancesController } from './appearances.controller';
import { AppearancesService } from './appearances.service';

describe('AppearancesController', () => {
  let controller: AppearancesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppearancesController],
      providers: [AppearancesService],
    }).compile();

    controller = module.get<AppearancesController>(AppearancesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
