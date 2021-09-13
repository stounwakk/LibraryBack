import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/users.entity";
import {Repository} from "typeorm";
import {BookDto} from "./dto/book-dto";
import {Books} from "./books.entity";

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Books)
        private readonly booksRepository: Repository<Books>,
    ){}

    create(booksDto: BookDto) :Promise<Books>{
        const book = new Books();
        book.title = booksDto.title;
        return this.booksRepository.save(book);
    }


    async giveToUser(userId:number, id:number):Promise<Books> {
        const user = await this.usersRepository.findOne(userId)
            .then((candidate)=> {
            if (!candidate) throw new HttpException( 'Пользователя с таким id не существует', HttpStatus.BAD_REQUEST)
            if(candidate.hasTicket === false) throw new HttpException('У пользователя не абонимента', HttpStatus.BAD_REQUEST)
            return candidate
            })
            .catch((e)=> {
            throw e
            })
        const book = await this.booksRepository.findOne(id,{relations:['userId']})
            .then((candidate)=> {
                if (!candidate) throw new HttpException('Книги с таким id не существует', HttpStatus.BAD_REQUEST)
            if (candidate.userId) throw new HttpException('Книгa уже на руках', HttpStatus.BAD_REQUEST)
            return candidate
            })
            .catch((e=> {
                throw e
            }))
        const allBooks = await this.booksRepository.find({relations:['userId'],where:{userId:user}})
        if (allBooks.length>5) throw new HttpException('У пользователья 5 книг на руках, больше нельзя', HttpStatus.BAD_REQUEST)
            book.userId = user
            return this.booksRepository.save(book)
    }

    async getBookBack(id:number):Promise<Books>{
        const book = await this.booksRepository.findOne(id)
            .then((candidate)=> {
                if (!candidate) throw new HttpException('Книги с таким id не существует', HttpStatus.BAD_REQUEST)
                return candidate
            })
            .catch((e) => {
                throw e
            })
        book.userId=null
        return this.booksRepository.save(book)
    }

}
