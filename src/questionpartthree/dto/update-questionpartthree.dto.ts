import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionpartthreeDto } from './create-questionpartthree.dto';


export class UpdateQuestionpartthreeDto extends PartialType(CreateQuestionpartthreeDto) { }
