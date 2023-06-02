import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class SearchAttempt extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    query: string;

    @Column()
    @UpdateDateColumn()
    CreatedAt: Date;
}