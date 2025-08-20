import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateAuthorDto) {
    return this.prisma.author.create({ data: dto });
  }

  findAll() {
    return this.prisma.author.findMany({ include: { books: true } });
  }
}