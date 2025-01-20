import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateEmployeesDto {
  @IsString()
  @MinLength(3)
  firstName: string;

  @IsString()
  @MinLength(3)
  lastName: string;

  @IsString()
  @IsOptional()
  userName: string;

  @IsString()
  dni: string;

  @IsString()
  phone: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsBoolean()
  @IsOptional()
  isDeleted: boolean;

  @IsBoolean()
  @IsOptional()
  isAvailable: boolean;

  @IsUUID()
  @IsOptional()
  companyId: string;
}
