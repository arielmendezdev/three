import { Injectable } from '@nestjs/common';
import { CreateTentDto } from './dto/create-tent.dto';
import { UpdateTentDto } from './dto/update-tent.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Tent } from '../database/models/tent.model';
import { User } from '../database/models/user.model';

@Injectable()
export class TentsService {
  constructor(
    @InjectModel(Tent) private readonly modelTent: typeof Tent,
    @InjectModel(User) private readonly modelUser: typeof User,
  ) {}

  async create(createTentDto: CreateTentDto) {
    const newTent = await this.modelTent.create(createTentDto);
    return newTent;
  }

  async findAll() {
    const tents = await this.modelTent.findAll({
      include: User,
    });
    return tents;
  }

  async findOne(id: string) {
    const tent = await this.modelTent.findByPk(id);
    if (tent) return tent;
    return `Tent ${id} not Found`;
  }

  async update(id: string, updateTentDto: UpdateTentDto) {
    const tent = await this.modelTent.findByPk(id);
    if (tent) {
      tent.set(updateTentDto);
      tent.save();
      return tent;
    }
    return `Tent ${id} not Found`;
  }

  async remove(id: string) {
    const tent = await this.modelTent.findByPk(id);
    return `Tent ${id} not Found`;
  }

  async updateTrue(id: string) {
    const update = await this.modelTent.findByPk(id);
    update.set({ isAvailable: true });
    update.save();
    return update;
  }

  async updateFalse(id: string) {
    const update = await this.modelTent.findByPk(id);
    update.set({ isAvailable: false });
    update.save();
    return update;
  }
}
