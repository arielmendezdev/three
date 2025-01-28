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
    if (!createUserDto.tentId && !createUserDto.umbrellaId) {
      const newUser = await this.modelUser.create(createUserDto);
      return newUser;
    }

    let tent: any;
    let umbrella: any;

    try {
      if (createUserDto.tentId) {
        tent = await this.modelTent.findByPk(createUserDto.tentId);
        if (!tent) throw new Error('La carpa no existe');
        if (!tent.dataValues.isAvailable)
          throw new Error('La carpa ya esta ocupada');
      }

      if (createUserDto.umbrellaId) {
        umbrella = await this.modelUmbrella.findByPk(createUserDto.umbrellaId);
        if (!umbrella) throw new Error('La sombrilla no existe');
        if (!umbrella.dataValues.isAvailable)
          throw new Error('La sombrilla ya esta ocupada');
      }
    } catch (error) {
      return error.message;
    }

    try {
      if (tent) await tent.update({ isAvailable: false });
      if (umbrella) await umbrella.update({ isAvailable: false });

      const newUser = await this.modelUser.create(createUserDto);
      return newUser;
    } catch (error) {
      return 'Error al crear el usuario. Inténtalo de nuevo.';
    }
  }

  async findAll() {
    const users = await this.modelUser.findAll({
      include: [Address, Tent, Umbrella],
      where: { isDeleted: false },
    });
    return users;
  }

  async findOne(id: string) {
    const user = await this.modelUser.findOne({
      where: { id, isDeleted: false },
      include: [Address, Tent, Umbrella],
    });
    if (user) return user;
    return 'user not Found';
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updateUser = await this.modelUser.findByPk(id);

    if (!updateUserDto.tentId && !updateUserDto.umbrellaId) {
      updateUser.set(updateUserDto);
      await updateUser.save();
      return updateUser;
    }

    if (updateUserDto.tentId) return this.updateTent(updateUserDto, updateUser);

    if (updateUserDto.umbrellaId)
      return this.updateUmbrella(updateUserDto, updateUser);

    return updateUser;
  }

  private async updateTent(updateUserDto: UpdateUserDto, updateUser: User) {
    if (updateUser.tentId) {
      const tent = await this.modelTent.findOne({
        where: { id: updateUserDto.tentId },
      });
      if (tent.dataValues.isAvailable) {
        tent.set({
          ...tent,
          isAvailable: false,
        });
        await tent.save();
        const tentChanged = await this.modelTent.findOne({
          where: { id: updateUser.tentId },
        });
        tentChanged.set({
          ...tentChanged,
          isAvailable: true,
        });
        updateUser.set(updateUserDto);
        await updateUser.save();
        tentChanged.save();
        return updateUser;
      } else {
        return 'La carpa ya esta ocupada';
      }
    } else {
      updateUser.set(updateUserDto);
      await updateUser.save();
      return updateUser;
    }
  }
  private async updateUmbrella(updateUserDto: UpdateUserDto, updateUser: User) {
    if (updateUser.umbrellaId) {
      const umbrella = await this.modelUmbrella.findOne({
        where: { id: updateUserDto.umbrellaId },
      });
      if (umbrella.dataValues.isAvailable) {
        umbrella.set({
          ...umbrella,
          isAvailable: false,
        });
        await umbrella.save();
        const umbrellaChanged = await this.modelUmbrella.findOne({
          where: { id: updateUser.umbrellaId },
        });
        umbrellaChanged.set({
          ...umbrellaChanged,
          isAvailable: true,
        });
        updateUser.set(updateUserDto);
        await updateUser.save();
        umbrellaChanged.save();
        return updateUser;
      } else {
        return 'La sombrilla ya esta ocupada';
      }
    } else {
      updateUser.set(updateUserDto);
      await updateUser.save();
      return updateUser;
    }
  }

  async remove(id: string) {
    const user = await this.modelUser.findByPk(id);

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

  async removeTent(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.modelUser.findByPk(id);
    
    const tent = await this.modelTent.findOne({
      where: { id: user.dataValues.tentId },
    });

    if (!tent) return 'Tent not found';
    
    await tent.set({ isAvailable: true });
    tent.save();
    user.set({ tentId: null });
    user.save();
    return 'Tent removed successfully';
    
  }

  async removeUmbrella(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.modelUser.findByPk(id);

    const umbrella = await this.modelUmbrella.findOne({
      where: { id: user.dataValues.umbrellaId },
    });

    if (!umbrella) return 'Umbrella not found';

    await umbrella.set({ isAvailable: true });
    umbrella.save();
    user.set({ umbrellaId: null })
    user.save()

    return 'Umbrella removed successfully'

  }
}
