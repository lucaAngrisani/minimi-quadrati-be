import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import DbMQ from "./dbmq.entity";

@Entity()
export default class DbPoint extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("float")
    x: number;

    @Column("float")
    y: number;

    @Column("float")
    deltaY: number;

    @ManyToOne(() => DbMQ, (mq) => mq.points)
    mq: DbMQ;
}