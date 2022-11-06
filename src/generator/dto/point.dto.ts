import { IsNotEmpty } from "class-validator";

export class PointDto {
    @IsNotEmpty()
    x: number;

    @IsNotEmpty()
    y?: number;

    @IsNotEmpty()
    deltaY?: number;
}