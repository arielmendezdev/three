import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Company } from '../database/models/company.model';
import { Owner } from '../database/models/owner.model';

@Module({
  imports: [SequelizeModule.forFeature([Company, Owner])],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
