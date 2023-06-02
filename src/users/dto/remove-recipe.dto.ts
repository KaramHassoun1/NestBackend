import { PartialType } from '@nestjs/mapped-types';
import { AddReceiptDto } from './add-recipe.dto';

export class RemoveRecipeDto extends PartialType(AddReceiptDto) {}
