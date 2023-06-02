import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  showAll() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  show(@Param('id') id: string) {
    return this.usersService.showById(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get(':id/recipes')
  showRecipes(@Param('id') id: string) {
    return this.usersService.showRecipes(+id);
  }

  @Post(':id/recipes')
  AddRecipe(@Param('id') id: string, @Body() AddReceiptDto: any) {
    return this.usersService.addRecipe(+id, AddReceiptDto.recipeId);
  }

  @Delete(':id/recipes')
  RemoveRecipe(@Param('id') id: string, @Body() DeleteReceiptDto: any) {
    return this.usersService.removeRecipe(+id, DeleteReceiptDto.recipeId);
  }

  @Get(':id/feedbacks')
  showFeedbacks(@Param('id') id: string) {
    return this.usersService.showFeedbacks(+id);
  }



  
}
