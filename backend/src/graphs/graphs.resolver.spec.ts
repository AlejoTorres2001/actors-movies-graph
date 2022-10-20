import { Test, TestingModule } from '@nestjs/testing';
import { GraphsResolver } from './graphs.resolver';
import { GraphsService } from './graphs.service';

describe('GraphsResolver', () => {
  let resolver: GraphsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphsResolver, GraphsService],
    }).compile();

    resolver = module.get<GraphsResolver>(GraphsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
