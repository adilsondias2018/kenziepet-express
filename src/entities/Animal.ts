import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable, OneToMany } from "typeorm";
import { Characteristic } from "./Characteristic";
import {Group} from "./Group"
@Entity()
export class Animal {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    name!:string
    @Column()
    age!:number
    @Column()
    weigh!: number
    @Column()
    sex!:string

    @ManyToMany(() => Characteristic, characteristic => characteristic.animals)
    @JoinTable() // Obrigatório se a relação for M:M ou ManyToMany
    characteristics!: Characteristic[]

    @ManyToOne(() => Group, group => group.animals)
    groups!: Group


}
