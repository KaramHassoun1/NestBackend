import { Feedback } from "src/feedbacks/feedback.entity";
import { Ingredient } from "src/ingredients/ingredient.entity";
import { BaseEntity, BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Recipe extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @Column()
    imageUrl: string;

    @Column()
    source: string;

    @Column()
    mealType: string;

    @Column()
    cuisineType: string;

    @Column()
    @UpdateDateColumn()
    CreatedAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => Ingredient)
    @JoinTable()
    ingredients: Ingredient[];

    @OneToMany(() => Feedback, feedback => feedback.recipe)
    feedbacks: Feedback[];
}