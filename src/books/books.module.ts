import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Books} from "./books.entity";
import {UsersModule} from "../users/users.module";
import {User} from "../users/users.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Books,User])],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
