import {Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Books} from "../books/books.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:false})
    email: string

    @Column({nullable:false})
    name:string

    @Column({default:false})
    hasTicket:boolean

    @OneToMany(type=>Books, books => books.userId)
    bookId: Books


}

