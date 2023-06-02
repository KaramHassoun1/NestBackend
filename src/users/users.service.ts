import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Recipe } from 'src/recipes/recipe.entity';

@Injectable()
export class UsersService {
  async findAll() {
    return await User.find();
  }

  async create(createUserDto: CreateUserDto) {

    let user = new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.recipes = [];
    user.username = createUserDto.username;
    user.city = createUserDto.city;
    user.country = createUserDto.country;
    user.bio = createUserDto.bio;
    await user.save();
    delete user.password;
    return user;
  }

  async showById(id: number): Promise<User> {
    const user = await this.findById(id);
    delete user.password;
    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found', '404');
    }
    return user;

  }
  
  async findByEmail(email: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found', '404');
    }
    return user;
  }


  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findById(id);
    user.bio = updateUserDto.bio;
    user.city = updateUserDto.city;
    user.country = updateUserDto.country;
    user.username = updateUserDto.username;
    user.email = updateUserDto.email;
    await user.save();
    delete user.password;
    return user;
  }

  async remove(id: number) {
    const user = await this.findById(id);
    await user.remove();
    delete user.password;
    return user;
  }

  async showRecipes(id: number) {
    const user = await User.findOne({ where: { id }, relations: ['recipes'] });
    if (!user) {
      throw new NotFoundException('User not found', '404');
    }
    return user.recipes;
  }

  async addRecipe(id: number, recipeId: number) {
    const user = await User.findOne({ where: { id }, relations: ['recipes']});
    if (!user) {
      throw new NotFoundException('User not found', '404');
    }
    const recipe = await Recipe.findOne({ where: { id: recipeId } });
    if (!recipe) {
      throw new NotFoundException('Recipe not found', '404');
    }
    user.recipes.push(recipe);
    await user.save();
    return user;
  }

  async removeRecipe(id: number, recipeId: number) {
    const user = await User.findOne({ where: { id }, relations: ['recipes'] });
    if (!user) {
      throw new NotFoundException('User not found', '404');
    }
    const recipe = await Recipe.findOne({ where: { id: recipeId } });
    if (!recipe) {
      throw new NotFoundException('Recipe not found', '404');
    }
    user.recipes = user.recipes.filter(recipe => recipe.id !== recipeId);
    await user.save();
    return user;
  }

  async showFeedbacks(id: number) {
    const user = await User.findOne({ where: { id }, relations: ['feedbacks'] });
    if (!user) {
      throw new NotFoundException('User not found', '404');
    }
    return await user.feedbacks;
  }
}
