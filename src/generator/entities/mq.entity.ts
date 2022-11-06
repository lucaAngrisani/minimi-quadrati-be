import { Relationship, Node } from "@nhogs/nestjs-neo4j";
import { AN } from "../calculate.service";

@Node({ label: 'MQ' })
export class MQ {
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
};

@Relationship({ type: 'HAS' })
export class WorkInDto {

}