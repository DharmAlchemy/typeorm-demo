import {Column, Entity,  JoinColumn,  ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import { User } from "./User";


@Entity()
export class Hobbies {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name: string;

}
