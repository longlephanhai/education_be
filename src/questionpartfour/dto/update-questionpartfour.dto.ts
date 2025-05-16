import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionpartfourDto } from './create-questionpartfour.dto';

export class UpdateQuestionpartfourDto extends PartialType(CreateQuestionpartfourDto) {}
