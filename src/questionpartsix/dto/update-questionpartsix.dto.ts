import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionpartsixDto } from './create-questionpartsix.dto';

export class UpdateQuestionpartsixDto extends PartialType(CreateQuestionpartsixDto) {}
