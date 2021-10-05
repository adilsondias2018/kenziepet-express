import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate} from "typeorm";
import bcrypt from "bcrypt"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    username!: string
    @Column()
    passaword!: string

    
    constructor(data: Partial<User>){
        Object.assign(this, data);
    }

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        this.passaword = bcrypt.hashSync(this.passaword, 8)
    }

}
