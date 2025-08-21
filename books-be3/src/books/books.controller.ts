import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBooksQueryDto } from './dto/get-books.query.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() dto: CreateBookDto) {
    return this.booksService.create(dto);
  }

  @Get()
  findAll(@Query() query: GetBooksQueryDto) {
    return this.booksService.findPaginated(query);
  }
}