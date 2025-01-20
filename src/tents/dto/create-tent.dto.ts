import {
  IsBoolean,
  IsUUID,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTentDto {
  @IsString()
  @MaxLength(2)
  number: string;

  @IsString()
  @MaxLength(2)
  corridor: string;

  @IsBoolean()
  @IsOptional()
  isDeleted: boolean;

  @IsUUID()
  @IsOptional()
  userId: string;
}
