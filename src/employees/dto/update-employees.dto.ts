import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeesDto } from './create-employees.dto';

export class UpdateEmployeesDto extends PartialType(CreateEmployeesDto) {}
