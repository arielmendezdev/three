import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Address } from '../database/models/address.model';
import { User } from '../database/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Address, User])],
  controllers: [AddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
