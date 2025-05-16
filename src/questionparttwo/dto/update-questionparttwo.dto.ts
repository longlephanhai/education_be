import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionparttwoDto } from './create-questionparttwo.dto';

export class UpdateQuestionparttwoDto extends PartialType(CreateQuestionparttwoDto) {}
