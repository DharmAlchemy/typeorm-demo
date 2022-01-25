import {Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn,JoinTable, ManyToMany} from "typeorm";
import { Length, IsInt, Min, Max } from "class-validator";
import { Hobbies } from "./Hobbies";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(1,10)
    firstName: string;

    @Column()
    @Length(1,10)
    lastName: string;

    @Column()
    @IsInt()
    @Min(18)
    @Max(45)
    age: number;

    @ManyToMany(()=>Hobbies, {cascade:true} )
    @JoinTable({name:"user_hobbies"})
    hobbies : Hobbies[];

    @DeleteDateColumn()
    deletedAt: Date;

}
