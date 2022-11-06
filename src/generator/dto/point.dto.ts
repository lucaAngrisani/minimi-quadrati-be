import { IsNotEmpty } from "class-validator";
import { Node } from "@nhogs/nestjs-neo4j"
@Node({ label: 'Point' })
export class PointDto {
    @IsNotEmpty()
    x: number;

    @IsNotEmpty()
    y?: number;

    @IsNotEmpty()
    deltaY?: number;
}