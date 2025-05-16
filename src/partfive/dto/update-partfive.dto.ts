import { PartialType } from '@nestjs/mapped-types';
import { CreatePartfiveDto } from './create-partfive.dto';

export class UpdatePartfiveDto extends PartialType(CreatePartfiveDto) {}
