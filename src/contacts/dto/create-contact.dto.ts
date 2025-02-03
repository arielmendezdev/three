import { IsString, MinLength } from "class-validator";

export class CreateContactDto {

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  phone: string;

  @IsString()
  message: string;

}
