import { Injectable, NotFoundException } from '@nestjs/common';
import { Feedback } from './feedback.entity';
import { Recipe } from 'src/recipes/recipe.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Injectable()
export class FeedbacksService {

    async create(createFeedbackDto: CreateFeedbackDto) {
        let feedback = new Feedback();
        feedback.comment = createFeedbackDto.comment;
        feedback.rating = createFeedbackDto.rating;
        const recipe = await Recipe.findOne({ where: { id: createFeedbackDto.recipeId }, relations: ['feedbacks'] });

        if (!recipe) {
          throw new NotFoundException('Recipe not found', '404');
        }

        
        feedback.recipe = recipe;
        await feedback.save();
        return feedback;
    }

    async findById(id: number) {
        const feedback = await Feedback.findOne({ where: { id } });
        if (!feedback) {
            throw new NotFoundException('Feedback not found', '404');
        }
        return feedback;
    }

    async findAll() {
        return await Feedback.find();
    }


    async update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
        const feedback = await this.findById(id);
        if (!feedback) {
            throw new NotFoundException('Feedback not found', '404');
        }
        feedback.comment = updateFeedbackDto.comment;
        feedback.rating = updateFeedbackDto.rating;
        await feedback.save();
        return feedback;
    }

    async remove(id: number) {
        const feedback = await this.findById(id);
        if (!feedback) {
            throw new NotFoundException('Feedback not found', '404');
        }
        await feedback.remove();
        return feedback;
    }
}
