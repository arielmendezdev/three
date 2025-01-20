import { PartialType } from '@nestjs/mapped-types';
import { CreateUmbrellaDto } from './create-umbrella.dto';

export class UpdateUmbrellaDto extends PartialType(CreateUmbrellaDto) {}
