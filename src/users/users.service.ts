import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from '../database/models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly modelUser: typeof User,

  ) {}

  async create(createUserDto: CreateUserDto) {
    // console.log(createUserDto)
    const newUser = await this.modelUser.create(createUserDto);
    return newUser;
     
  }

  async findAll() {
    const users = await this.modelUser.findAll({
      where: { isDeleted: true },
    });
    return users;
  }

  async findOne(id: string) {
    const user = await this.modelUser.findByPk(id);
    if (user) return user;
    return 'user not Found';
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updateUser = await this.modelUser.findByPk(id);

    updateUser.set(updateUserDto);
    await updateUser.save();
    return updateUser;  
  }

  async remove(id: string) {
    const user = await this.modelUser.findByPk(id);
    // console.log(user.dataValues.tentId)

    user.set({ isDeleted: true });
    user.save();
    return 'user deleted successfully';
  }
}
