import { PartialType } from '@nestjs/mapped-types';
import { CreatePartoneDto } from './create-partone.dto';

export class UpdatePartoneDto extends PartialType(CreatePartoneDto) {}
