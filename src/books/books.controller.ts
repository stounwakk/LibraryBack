import {Body, Controller, Param, Post, Query} from '@nestjs/common';
import {BooksService} from "./books.service";
import {BookDto} from "./dto/book-dto";
import {ApiOperation} from "@nestjs/swagger";
import { Books } from './books.entity';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @ApiOperation({summary:'Создание книги'})
    @Post()
    create(@Body() booksDto: BookDto) :Promise<Books>{
        return this.booksService.create(booksDto)
    }

    @ApiOperation({summary:'Добавление книги к пользователю'})
    @Post('/give')
    giveToUser(@Query('userId') userId :number,
               @Query('id') id:number) :Promise<Books> {
        return this.booksService.giveToUser(userId,id)
    }

    @ApiOperation({summary:'Возвращение книги'})
    @Post('/get')
    getBookBack(@Query('id')id:number):Promise<Books> {
        return this.booksService.getBookBack(id)
    }
}
