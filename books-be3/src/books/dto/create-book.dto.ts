import { Transform, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Length, MaxLength, Min } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @Length(1, 255, { message: 'title: 1–255 znaków' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  title!: string;

  @IsString()
  @IsNotEmpty({ message: 'Genre is required' })
  @MaxLength(50, { message: 'genre: maks. 50 znaków' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  genre?: string;

  @Type(() => Number)
  @IsInt({ message: 'authorId: liczba całkowita' })
  @Min(1, { message: 'authorId: ≥ 1' })
  authorId!: number;
}
