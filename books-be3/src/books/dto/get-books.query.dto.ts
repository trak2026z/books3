import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

export enum BookSortBy { id = 'id', title = 'title' }
export enum SortOrder { asc = 'asc', desc = 'desc' }

export class GetBooksQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit: number = 10;

  @IsEnum(BookSortBy)
  @IsOptional()
  sortBy: BookSortBy = BookSortBy.id;

  @IsEnum(SortOrder)
  @IsOptional()
  order: SortOrder = SortOrder.asc;
}
