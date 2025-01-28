import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = this.usersService.create(createUserDto);
      return newUser;
    } catch (error) {
      return error;
    }
  }

  @Get()
  findAll() {
    const users = this.usersService.findAll();
    return users;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Patch('removetent/:id')
  removeTent(@Param('id') id: string, updateUserDto: UpdateUserDto) {
    return this.usersService.removeTent(id, updateUserDto);
  }
  @Patch('removeumbrella/:id')
  removeUmbrella(@Param('id') id: string, updateUserDto: UpdateUserDto) {
    return this.usersService.removeUmbrella(id, updateUserDto);
  }
}
