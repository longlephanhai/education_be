import { PartialType } from '@nestjs/mapped-types';
import { CreatePartthreeDto } from './create-partthree.dto';

export class UpdatePartthreeDto extends PartialType(CreatePartthreeDto) {}
