import { PartialType } from '@nestjs/mapped-types';
import { CreatePartfourDto } from './create-partfour.dto';

export class UpdatePartfourDto extends PartialType(CreatePartfourDto) {}
