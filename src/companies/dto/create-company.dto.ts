import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  phone: string;

  @IsBoolean()
  @IsOptional()
  isDeleted: boolean;

}
