import { Injectable } from '@nestjs/common';
import { CreateSearchAttemptDto } from './dto/create-search-attempts.dto';
import { SearchAttempt } from './searchattempt.entity';
import axios from 'axios';
import { Recipe } from 'src/recipes/recipe.entity';
import { Ingredient } from 'src/ingredients/ingredient.entity';

@Injectable()
export class SearchAttemptsService {
    async create(createSearchAttemptDto: CreateSearchAttemptDto) {
        const query = createSearchAttemptDto.query;
        const url = `https://api.edamam.com/api/recipes/v2?q=${query}&app_id=cdb9061c&app_key=b9b96164480d4423225a433f4a2940dd&type=public`;
        const response = await axios.get(url);
        let recipes = [];
        for (const hit of response.data.hits) {
            let recipe = new Recipe();
            recipe.label = hit.recipe.label;
            recipe.imageUrl = hit.recipe.image;
            recipe.source = hit.recipe.source;
            recipe.mealType = hit.recipe.mealType[0];
            recipe.cuisineType = hit.recipe.cuisineType[0];
            recipe.ingredients = [];
            recipe.feedbacks = [];
            for (const recipe_ingredient of hit.recipe.ingredients) {
                let ingredient = new Ingredient();
                ingredient.text = recipe_ingredient.text;
                ingredient.weight = recipe_ingredient.weight;
                ingredient.foodCategory = recipe_ingredient.foodCategory;
                ingredient.imageUrl = recipe_ingredient.image;
                ingredient.quantity = recipe_ingredient.quantity;
                ingredient.food = recipe_ingredient.food;
                await ingredient.save();
                recipe.ingredients.push(ingredient);
            }
            recipes.push(recipe);
            await recipe.save();
        }
        // Save search attempt
        const searchAttempt = new SearchAttempt();
        searchAttempt.query = query;
        await searchAttempt.save();
    
        return {
          searchAttempt,
          recipes: recipes, // Include the response from the external API if needed
        };
    
    }

    async findAll() {
        return await SearchAttempt.find();
    }

    async findById(id: number) {
        return await SearchAttempt.findOne({ where: { id } });
    }
}
