import { BaseEntity, BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import * as bcrypt from 'bcryptjs';
import { Recipe } from "src/recipes/recipe.entity";
import { Feed } from "semantic-ui-react";
import { Feedback } from "src/feedbacks/feedback.entity";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    city: string;

    @Column()
    country: string;

    @Column()
    bio: string;

    @Column()
    email: string;

    @Column()
    @UpdateDateColumn()
    CreatedAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    password: string;

    @ManyToMany(() => Recipe, recipe => recipe.users)
    @JoinTable()
    recipes: Recipe[];

    @OneToMany(() => Feedback, feedback => feedback.user)
    feedbacks: Feedback[];

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 8);
    }

    async validatePassword(password: string): Promise<boolean>{
        return await bcrypt.compare(password, this.password);
    }
}