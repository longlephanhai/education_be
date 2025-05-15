import { PartialType } from '@nestjs/mapped-types';
import { CreateParttwoDto } from './create-parttwo.dto';

export class UpdateParttwoDto extends PartialType(CreateParttwoDto) {}
