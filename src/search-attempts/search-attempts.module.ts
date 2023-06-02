import { Module } from '@nestjs/common';
import { SearchAttemptsService } from './search-attempts.service';
import { SearchAttemptsController } from './search-attempts.controller';

@Module({
  controllers: [SearchAttemptsController],
  providers: [SearchAttemptsService]
})
export class SearchAttemptsModule {}
