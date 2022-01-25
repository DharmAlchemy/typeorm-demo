import {Entity,Column,  OneToMany, PrimaryGeneratedColumn, BaseEntity, DeleteDateColumn} from "typeorm";
import { Product } from "./Product";

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name :string

    @OneToMany( () => Product , product => product.category)
    product : Product[];

    @DeleteDateColumn()
    deletedAt : Date;

}
