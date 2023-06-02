import { Injectable, NotFoundException } from '@nestjs/common';
import { Ingredient } from './ingredient.entity';

@Injectable()
export class IngredientsService {
    async findById(id: number) {
        const ingredient = await this.findById(id);
        if (!ingredient) {
            throw new NotFoundException('Ingredient not found', '404');
        }
        return ingredient;
    }

    async findAll() {
        return await Ingredient.find();
    }
}
