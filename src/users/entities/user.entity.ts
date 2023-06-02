import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import * as bcrypt from 'bcryptjs';

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

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 8);
    }

    async validatePassword(password: string): Promise<boolean>{
        return await bcrypt.compare(password, this.password);
    }
}