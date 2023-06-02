import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateFeedbackDto {
    @IsNotEmpty()
    comment: string;

    @IsNotEmpty()
    rating: number;

    @IsNotEmpty()
    recipeId: number;
}
