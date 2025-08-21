import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBooksQueryDto } from './dto/get-books.query.dto';
import { Prisma } from '@prisma/client';

type Paginated<T> = {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    pageCount: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};
@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateBookDto) {
    return this.prisma.book.create({ data: dto });
  }

  findAll() {
    return this.prisma.book.findMany({ include: { author: true } });
  }

  async findPaginated(query: GetBooksQueryDto): Promise<Paginated<Prisma.BookGetPayload<{ include: { author: true } }>>> {
    const { page, limit, sortBy, order } = query;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.book.findMany({
        skip,
        take: limit,
        orderBy: { [sortBy]: order },
        include: { author: true },
      }),
      this.prisma.book.count(),
    ]);

    const pageCount = Math.max(1, Math.ceil(total / limit) || 1);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        pageCount,
        hasNext: page < pageCount,
        hasPrev: page > 1,
      },
    };
  }
}