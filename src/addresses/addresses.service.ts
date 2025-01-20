import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from '../database/models/address.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AddressesService {
  constructor(
    @InjectModel(Address) private readonly modelAddress: typeof Address,
  ) {}

  create(createAddressDto: CreateAddressDto) {
    const newAddress = this.modelAddress.create(createAddressDto);
    return newAddress;
  }

  async findAll() {
    const address = await this.modelAddress.findAll();
    if (address.length > 0) return address;
    return 'Not address available';
  }

  findOne(id: string) {
    const address = this.modelAddress.findByPk(id);
    if (address) return address;
    return `Address ${id} Not Found`;
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    const addressUpdate = await this.modelAddress.findByPk(id);
    if (addressUpdate) {
      addressUpdate.set(updateAddressDto);
      await addressUpdate.save();
      return addressUpdate;
    }
    return `Address ${id} Not Found`;
  }

  async remove(id: string) {
    const address = await this.modelAddress.findByPk(id);
    if (address) {
      address.set({ isDeleted: true });
      await address.save();
      return address;
    }
    return `Address ${id} Not Found`;
  }
}
