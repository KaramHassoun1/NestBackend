import { Controller, Get, Param, Post } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get(':id')
  showById(@Param('id') id: number) {
    return this.ingredientsService.findById(id);
  }

  @Get()
  showAll() {
    return this.ingredientsService.findAll();
  }
}
