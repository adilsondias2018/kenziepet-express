import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";
import { Animal } from "./Animal";

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    name!: string
    @Column()
    scientific_name!: string

    @OneToMany(() => Animal, animal => animal.groups)
    animals!: Animal

}
