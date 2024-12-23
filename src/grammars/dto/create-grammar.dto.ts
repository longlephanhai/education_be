/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

export class CreateGrammarDto {
  @IsNotEmpty({ message: 'Tiêu đề không được để trống' })
  title: string

  @IsNotEmpty({ message: 'Nội dung không được để trống' })
  content: string;
}
