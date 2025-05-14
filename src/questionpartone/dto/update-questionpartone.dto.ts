import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionpartoneDto } from './create-questionpartone.dto';

export class UpdateQuestionpartoneDto extends PartialType(CreateQuestionpartoneDto) {}
