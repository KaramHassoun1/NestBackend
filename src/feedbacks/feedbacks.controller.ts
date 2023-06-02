import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Get()
  showAll() {
    return this.feedbacksService.findAll();
  }

  @Post()
  create(@Body() CreateFeedbackDto: CreateFeedbackDto) {
    return this.feedbacksService.create(CreateFeedbackDto);
  }

  @Get(':id')
  showById(@Param('id') id: number) {
    return this.feedbacksService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateFeedbackDto: UpdateFeedbackDto) {
    return this.feedbacksService.update(id, updateFeedbackDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.feedbacksService.remove(id);
  }

}
