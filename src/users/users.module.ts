import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { User } from '../database/models/user.model';
import { Address } from '../database/models/address.model';
import { Tent } from '../database/models/tent.model';
// import { Umbrella } from '../database/models/umbrella.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Address, Tent])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
