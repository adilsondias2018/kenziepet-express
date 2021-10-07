import { Animal } from './Animal';
import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm";

@Entity()
export class Characteristic {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    name!: string

    // Opcional utilizado para fazer o Many to Many bidirecional 
    @ManyToMany(() => Animal, animal => animal.characteristics,{
        cascade: true
    })
    animals!: Animal

}
