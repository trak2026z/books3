import { Transform } from 'class-transformer';
import { IsEmail, IsString, Length, MaxLength } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @Length(1, 30, { message: 'name: 1–30 znaków' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  name!: string;

  @IsEmail({}, { message: 'email: niepoprawny format' })
  @MaxLength(30, { message: 'email: maks. 30 znaków' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  email!: string;
}
