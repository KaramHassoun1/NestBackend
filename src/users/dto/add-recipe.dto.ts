import { IsNotEmpty } from "class-validator";

export class AddReceiptDto {
    @IsNotEmpty()
    ReceiptId: string;
}
