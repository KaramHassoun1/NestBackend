import { IsEmail, IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class CreateFeedbackDto {
    @IsNotEmpty()
    comment: string;

    @IsInt()
    @Min(1, { message: 'Rating must be greater than or equal to 1' })
    @Max(5, { message: 'Rating must be less than or equal to 5' })
    rating: number;


    @IsNotEmpty()
    recipeId: number;

    @IsNotEmpty()
    userId: number;
}
