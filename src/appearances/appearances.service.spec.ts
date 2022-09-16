import { Test, TestingModule } from '@nestjs/testing';
import { AppearancesService } from './appearances.service';

describe('AppearancesService', () => {
  let service: AppearancesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppearancesService],
    }).compile();

    service = module.get<AppearancesService>(AppearancesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
