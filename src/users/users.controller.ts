import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {User} from "./users.entity";
import {CreateUserDto} from "./dto/user-dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({summary:'Создание пользователя'})
    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto)
    }

    @ApiOperation({summary:'Получение всех пользователей'})
    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll()
    }

    @ApiOperation({summary:'Получение информации о конкретном пользователе + список взятых книг'})
    @Get('/user')
    findOne(@Query('id') id: number): Promise<any> {
        return this.usersService.findById(id)
    }

    @ApiOperation({summary:'Удаление пользователя'})
    @Delete()
    remove(@Query('id') id: number): Promise<void> {
        return this.usersService.remove(id)
    }

    @ApiOperation({summary:'Обновление данных пользователя'})
    @Put()
    update(@Body() createUserDto:CreateUserDto,
           @Query('id') id : number) :Promise<User> {
        return this.usersService.update(id, createUserDto)
    }

    @ApiOperation({summary:'Получение абонемента'})
    @Post('/ticket')
    addTicket(@Query('id') id:number): Promise<User> {
        return this.usersService.addTicket(id)
    }
}
