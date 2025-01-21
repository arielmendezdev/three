import { Injectable } from '@nestjs/common';
import { CreateUmbrellaDto } from './dto/create-umbrella.dto';
import { UpdateUmbrellaDto } from './dto/update-umbrella.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Umbrella } from '../database/models/umbrella.model';
import { User } from '../database/models/user.model';

@Injectable()
export class UmbrellasService {
  constructor(
    @InjectModel(Umbrella) private readonly modelUmbrella: typeof Umbrella,
    @InjectModel(User) private readonly modelUser: typeof User,
  ) {}

  async create(createUmbrellaDto: CreateUmbrellaDto) {

    const newUmbrella = await this.modelUmbrella.create(createUmbrellaDto);

    return newUmbrella
  }

  async findAll() {
    const umbrellas = await this.modelUmbrella.findAll({
      include: User,
    });
    return umbrellas;
  }

  async findOne(id: string) {
    const umbrella = await this.modelUmbrella.findByPk(id);
    return umbrella
  }

  async update(id: string, updateUmbrellaDto: UpdateUmbrellaDto) {
    const updateUmbrella = await this.modelUmbrella.findByPk(id);
    if (updateUmbrella) {
      updateUmbrella.set(updateUmbrellaDto);
      updateUmbrella.save();
      return updateUmbrella;
    }
    return `La sombrilla no existe`;
  }

  async remove(id: string) {
    const umbrella = await this.modelUmbrella.findByPk(id);
    if (umbrella) {
      umbrella.set({ isDeleted: true });
      umbrella.save();
      return umbrella;
    }
    return `La sombrilla no existe`;
  }
}
