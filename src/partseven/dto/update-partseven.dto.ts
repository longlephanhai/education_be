import { PartialType } from '@nestjs/mapped-types';
import { CreatePartsevenDto } from './create-partseven.dto';

export class UpdatePartsevenDto extends PartialType(CreatePartsevenDto) {}
