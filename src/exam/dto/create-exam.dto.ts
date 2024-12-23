/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateExamDto {
  @IsNotEmpty({ message: 'Tên bộ đề không được để trống' })
  name: string;

  @IsNotEmpty({ message: 'Miêu tả không được để trống' })
  description: string;

  @IsOptional()
  audioUrl: string;
}
