import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SearchAttemptsService } from './search-attempts.service';
import { CreateSearchAttemptDto } from './dto/create-search-attempts.dto';

@Controller('search-attempts')
export class SearchAttemptsController {
  constructor(private readonly searchAttemptsService: SearchAttemptsService) {}

  @Post()
  create(@Body() createSearchAttemptDto: CreateSearchAttemptDto) {
    return this.searchAttemptsService.create(createSearchAttemptDto);
  }

  @Get()
  showAll() {
    return this.searchAttemptsService.findAll();
  }

  @Get(':id')
  showById(@Param('id') id: number) {
    return this.searchAttemptsService.findById(id);
  }
}
