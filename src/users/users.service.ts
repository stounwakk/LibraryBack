import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {User} from "./users.entity";
import {Repository} from "typeorm";
import { CreateUserDto } from './dto/user-dto';
import {Books} from "../books/books.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Books)
        private readonly booksRepository: Repository<Books>
    ) {}

    create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.email = createUserDto.email;
        user.name = createUserDto.name;

        return this.usersRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findById(id: number): Promise<any> {
        try{
            const user = await this.usersRepository.findOneOrFail(id)
            const books = await this.booksRepository.find({where:{userId:id}})
            const result = {user,books}
            return result
        } catch (e) {
            throw e
        }

    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }


    async update(id: number, createUserDto: CreateUserDto): Promise<User> {
        const updatingUser = await this.findById(id)
            .then((user) => {
                if (!user) return new HttpException('Пользователя не существует', HttpStatus.BAD_REQUEST)
                return user
            })
            .catch((e) => {
                throw e
            })
        updatingUser.user.email= createUserDto.email
        updatingUser.user.name = createUserDto.name
        return this.usersRepository.save(updatingUser.user);
    }

    async addTicket(id:number):Promise<User>{
        const user = await this.usersRepository.findOne(id)
            .then((candidate)=> {
                if (!candidate) throw new HttpException( 'Пользователь не существует', HttpStatus.BAD_REQUEST)
                if(candidate.hasTicket === true) throw new HttpException( 'Пользователь уже приобрел абонемент', HttpStatus.BAD_REQUEST)
                candidate.hasTicket = true
                return candidate
            })
            .catch((e)=> {
                throw e
            })

        return this.usersRepository.save(user)

    }
}
