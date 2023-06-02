import { Test, TestingModule } from '@nestjs/testing';
import { SearchAttemptsService } from './search-attempts.service';

describe('SearchAttemptsService', () => {
  let service: SearchAttemptsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchAttemptsService],
    }).compile();

    service = module.get<SearchAttemptsService>(SearchAttemptsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
