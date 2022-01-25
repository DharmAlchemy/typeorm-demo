import {BaseEntity ,Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { Category } from "./Category";

@Entity()
export class Product extends BaseEntity {

@PrimaryGeneratedColumn()
id : number;

@Column()
name : string;

@Column()
price : number;

@Column()
quantity : number;

@DeleteDateColumn()
deletedAt : Date;

@ManyToOne(()=>Category , category => category.product, {onDelete: "CASCADE" })
@JoinColumn({name:"category_id"})
category : Category;

}
