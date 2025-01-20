import { Module } from '@nestjs/common';
import { TentsService } from './tents.service';
import { TentsController } from './tents.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tent } from '../database/models/tent.model';
import { User } from '../database/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Tent, User])],
  controllers: [TentsController],
  providers: [TentsService],
})
export class TentsModule {}
