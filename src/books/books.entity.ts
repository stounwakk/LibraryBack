import { User } from "src/users/users.entity";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Books{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title: string

    @ManyToOne(type=> User, user=>user.bookId)
    userId: User

}