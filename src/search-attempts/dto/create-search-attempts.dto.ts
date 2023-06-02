import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateSearchAttemptDto {
    @IsNotEmpty()
    query: string;
}
