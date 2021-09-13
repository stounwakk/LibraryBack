import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./users.entity";
import { Books } from 'src/books/books.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Books])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
