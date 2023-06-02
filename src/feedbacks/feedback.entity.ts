import { Recipe } from "src/recipes/recipe.entity";
import { BaseEntity, BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Feedback extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    comment: string;

    @Column()
    rating: number;

    @Column()
    @UpdateDateColumn()
    CreatedAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Recipe, recipe => recipe.feedbacks)
    recipe: Recipe;
}