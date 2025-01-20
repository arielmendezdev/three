import { IsBoolean, IsEmail, IsOptional, IsString, MinLength } from "class-validator"

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    firstName: string
    
    @IsString()
    @MinLength(3)
    lastName: string
    
    @IsString()
    @IsOptional()
    userName: string
    
    @IsString()
    dni: string

    @IsString()
    phone: string

    @IsString()
    @IsEmail()
    @IsOptional()
    email: string
    
    @IsBoolean()
    @IsOptional()
    isDeleted: boolean
    
    @IsBoolean()
    @IsOptional()
    isAvailable: boolean
    
    @IsString()
    @IsOptional()
    tentId: string
    
    @IsString()
    @IsOptional()
    umbrellaId: string
}
