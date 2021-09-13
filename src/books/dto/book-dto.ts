import {ApiProperty} from "@nestjs/swagger";

export class BookDto {
    @ApiProperty()
    title: string
}