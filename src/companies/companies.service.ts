import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Company } from '../database/models/company.model';
// import { Owner } from '../database/models/owner.model';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company) private readonly modelCompany: typeof Company,
    // @InjectModel(Owner) private readonly modelOwner: typeof Owner,
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    const company = this.modelCompany.create(createCompanyDto);
    return company;
  }

  findAll() {
    const companies = this.modelCompany.findAll({
      // include: Owner,
    });
    return companies;
  }

  findOne(id: string) {
    return `This action returns a #${id} company`;
  }

  update(id: string, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: string) {
    return `This action removes a #${id} company`;
  }
}
