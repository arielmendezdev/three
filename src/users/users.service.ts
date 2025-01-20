import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from '../database/models/user.model';
import { Address } from '../database/models/address.model';
import { Tent } from '../database/models/tent.model';
import { Umbrella } from '../database/models/umbrella.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly modelUser: typeof User,
    @InjectModel(Address) private readonly modelAddress: typeof Address,
    @InjectModel(Tent) private readonly modelTent: typeof Tent,
    @InjectModel(Umbrella) private readonly modelUmbrella: typeof Umbrella,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // console.log(createUserDto)

    if (createUserDto.tentId) {
      const tent = await this.modelTent.findByPk(createUserDto.tentId);
      if (tent.dataValues.isAvailable) {
        tent.set({
          ...tent.dataValues,
          isAvailable: false,
        });
        tent.save();
        const newUser = await this.modelUser.create(createUserDto);
        return newUser;
      } else {
        return 'La carpa esta ocupada';
      }
    } else {
      const newUser = await this.modelUser.create(createUserDto);
      return newUser;
    }
  }

  async findAll() {
    const users = await this.modelUser.findAll({
      include: [Address, Tent, Umbrella],
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

    if (!updateUserDto.tentId) {
      updateUser.set({
        ...updateUserDto,
        tentId: null,
      });
      await updateUser.save();
      return updateUser;
    }

    if (updateUser.tentId) {
      const tent = await this.modelTent.findOne({
        where: { id: updateUser.tentId },
      });
      if (!tent) {
        updateUser.set(updateUserDto);
        await updateUser.save();
        return updateUser;
      } else {
        return 'La carpa ya esta ocupada';
      }
    } else {
      updateUser.set(updateUserDto);
      await updateUser.save();
      const tent = await this.modelTent.findOne({
        where: { id: updateUser.tentId },
      });
      if (tent.isAvailable) {
        updateUser.set(updateUserDto);
        await updateUser.save();
        return updateUser;
      } else {
        return 'La carpa ya esta ocupada';
      }
    }
  }

  async remove(id: string) {
    const user = await this.modelUser.findByPk(id);
    // console.log(user.dataValues.tentId)

    if (user.dataValues.tentId) {
      console.log(user.dataValues.tentId);
      const tent = await this.modelTent.findOne({
        where: { id: user.dataValues.tentId },
      });
      await tent.set({ isAvailable: true });
      tent.save();
    }

    user.set({ isDeleted: true });
    user.save();
    return 'user deleted successfully';
  }
}
