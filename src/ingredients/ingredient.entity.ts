import { Recipe } from "src/recipes/recipe.entity";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Ingredient extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    quantity: string;

    @Column()
    food: string;

    @Column()
    weight: string;

    @Column({ nullable: true })
    foodCategory: string;

    @Column({ nullable: true})
    imageUrl: string;

    @Column()
    @UpdateDateColumn()
    CreatedAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => Recipe, recipe => recipe.ingredients)
    recipes: Recipe[];
}