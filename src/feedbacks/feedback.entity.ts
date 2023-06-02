import { Recipe } from "src/recipes/recipe.entity";
import { User } from "src/users/entities/user.entity";
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

    @ManyToOne(() => User, user => user.feedbacks)
    user: User;
}