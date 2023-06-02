import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateRecipeDto {
    @IsNotEmpty()
    label: string;

    @IsNotEmpty()
    mealType: string;

    @IsNotEmpty()
    cuisineType: string;

    imageUrl: string;

    source: string;

}
