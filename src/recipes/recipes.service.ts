import { Injectable, NotFoundException } from '@nestjs/common';
import { Recipe } from './recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@Injectable()
export class RecipesService {

    async findAll() {
        return await Recipe.find();
    }
    
    async findById(id: number) {
        const recipe = await Recipe.findOne({ where: { id } });
        if (!recipe) {
            throw new NotFoundException('Recipe not found', '404');
        }
        return recipe;
    }

    async create(createRecipeDto: CreateRecipeDto) {
        let recipe = new Recipe();
        recipe.label = createRecipeDto.label;
        recipe.imageUrl = createRecipeDto.imageUrl;
        recipe.source = createRecipeDto.source;
        recipe.mealType = createRecipeDto.mealType;
        recipe.cuisineType = createRecipeDto.cuisineType;
        recipe.ingredients = [];
        recipe.feedbacks = [];
        await recipe.save();
        return recipe;
    }

    async update(id: number, createRecipeDto: CreateRecipeDto) {
        let recipe = await this.findById(id);
        if (!recipe) {
            throw new NotFoundException('Recipe not found', '404');
        }
        recipe.label = createRecipeDto.label;
        recipe.imageUrl = createRecipeDto.imageUrl;
        recipe.source = createRecipeDto.source;
        recipe.mealType = createRecipeDto.mealType;
        recipe.cuisineType = createRecipeDto.cuisineType;
        await recipe.save();
        return recipe;
    }

    async delete(id: number) {
        let recipe = await this.findById(id);
        if (!recipe) {
            throw new NotFoundException('Recipe not found', '404');
        }
        await recipe.remove();
        return recipe;
    }

    async addIngredient(id: number, ingredient: any) {
        let recipe = await this.findById(id);
        if (!recipe) {
            throw new NotFoundException('Recipe not found', '404');
        }
        recipe.ingredients.push(ingredient);
        await recipe.save();
        return recipe;
    }

    async addFeedback(id: number, feedback: any) {
        let recipe = await this.findById(id);
        if (!recipe) {
            throw new NotFoundException('Recipe not found', '404');
        }
        recipe.feedbacks.push(feedback);
        await recipe.save();
        return recipe;
    }

    async deleteIngredient(id: number, ingredientId: number) {
        let recipe = await this.findById(id);
        if (!recipe) {
            throw new NotFoundException('Recipe not found', '404');
        }
        recipe.ingredients = recipe.ingredients.filter(ingredient => ingredient.id !== ingredientId);
        await recipe.save();
        return recipe;
    }

    

    async showIngredients(id: number) {
        const recipe = await Recipe.findOne({ where: { id } , relations: ['ingredients']});
        if (!recipe) {
            throw new NotFoundException('Recipe not found', '404');
        }
        return recipe.ingredients;
    }

    async showFeedbacks(id: number) {
        const recipe = await Recipe.findOne({ where: { id } , relations: ['feedbacks']});
        if (!recipe) {
            throw new NotFoundException('Recipe not found', '404');
        }
        return recipe.feedbacks;
    }
}

