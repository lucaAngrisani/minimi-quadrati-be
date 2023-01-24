
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import DbPoint from "./dbpoint.entity";

@Entity()
export default class DbMQ extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("float")
    mediaX: number;

    @Column("float")
    mediaY: number;

    @Column("float")
    delta: number;

    @Column("float")
    coefficienteA: number;

    @Column("float")
    coefficienteB: number;

    @Column("float")
    sigmaY: number;

    @Column("float")
    sigmaA: number;

    @Column("float")
    sigmaB: number;

    @Column("float")
    incertezzaA: number;

    @Column("float")
    incertezzaB: number;

    @Column("text")
    analisiX: string;

    @Column("text")
    analisiY: string;

    @OneToMany(() => DbPoint, (point) => point.mq)
    points?: DbPoint[];

}