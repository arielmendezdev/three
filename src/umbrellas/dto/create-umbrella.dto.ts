import {
  IsBoolean,
  IsUUID,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUmbrellaDto {
  @IsString()
  @MaxLength(2)
  number: string;

  @IsBoolean()
  @IsOptional()
  isDeleted: boolean;

  @IsUUID()
  @IsOptional()
  userId: string;
}