import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  show(@Param('id') id: string) {
    return this.recipesService.findAll();
  }

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(createRecipeDto);
  }

  @Get(':id')
  showById(@Param('id') id: string) {
    return this.recipesService.findById(Number(id));
  }

  @Get(':id/ingredients')
  showIngredients(@Param('id') id: string) {
    return this.recipesService.showIngredients(Number(id));
  }
  
  @Get(':id/feedbacks')
  showFeedbacks(@Param('id') id: string) {
    return this.recipesService.showFeedbacks(Number(id));
  }
}