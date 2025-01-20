import { PartialType } from '@nestjs/mapped-types';
import { CreateTentDto } from './create-tent.dto';

export class UpdateTentDto extends PartialType(CreateTentDto) {}
