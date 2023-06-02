import { Test, TestingModule } from '@nestjs/testing';
import { SearchAttemptsController } from './search-attempts.controller';
import { SearchAttemptsService } from './search-attempts.service';

describe('SearchAttemptsController', () => {
  let controller: SearchAttemptsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchAttemptsController],
      providers: [SearchAttemptsService],
    }).compile();

    controller = module.get<SearchAttemptsController>(SearchAttemptsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
