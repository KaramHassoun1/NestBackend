import { IsNotEmpty } from "class-validator";

export class UpdateFeedbackDto {
    @IsNotEmpty()
    comment: string;

    @IsNotEmpty()
    rating: number;
}
