import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionpartsevenDto } from './create-questionpartseven.dto';

export class UpdateQuestionpartsevenDto extends PartialType(CreateQuestionpartsevenDto) {}
