import { PartialType } from '@nestjs/mapped-types';
import { CreatePartsixDto } from './create-partsix.dto';

export class UpdatePartsixDto extends PartialType(CreatePartsixDto) {}
