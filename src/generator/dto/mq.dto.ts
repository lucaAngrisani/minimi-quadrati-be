import { AN } from "../calculate.service";
import { PointDto } from "./point.dto";

export class MQDto {
    id?: string;
    mediaX: number;
    mediaY: number;
    delta: number;
    coefficienteA: number;
    coefficienteB: number;
    sigmaY: number;
    sigmaA: number;
    sigmaB: number;
    incertezzaA: number;
    incertezzaB: number;
    analisiX: AN;
    analisiY: AN;
    points?: PointDto[];
};