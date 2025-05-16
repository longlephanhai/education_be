import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionpartfiveDto } from './create-questionpartfive.dto';

export class UpdateQuestionpartfiveDto extends PartialType(CreateQuestionpartfiveDto) {}
