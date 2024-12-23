import { PartialType } from '@nestjs/mapped-types';
import { CreateAboutusDto } from './create-aboutus.dto';

export class UpdateAboutusDto extends PartialType(CreateAboutusDto) {}
