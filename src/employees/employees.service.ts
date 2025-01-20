import { Injectable } from '@nestjs/common';
import { CreateEmployeesDto } from './dto/create-employees.dto';
import { UpdateEmployeesDto } from './dto/update-employees.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Employed } from '../database/models/employed.model';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employed) private readonly modelEmployed: typeof Employed,
  ) {}

  create(createEmployeeDto: CreateEmployeesDto) {
    return 'This action adds a new employee';
  }

  findAll() {
    const employees = this.modelEmployed.findAll();
    return employees;
  }

  findOne(id: string) {
    return `This action returns a #${id} employee`;
  }

  update(id: string, updateEmployeeDto: UpdateEmployeesDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: string) {
    return `This action removes a #${id} employee`;
  }
}
