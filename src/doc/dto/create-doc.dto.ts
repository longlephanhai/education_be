/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

export class CreateDocDto {
  @IsNotEmpty({ message: "Tiêu đề không được để trống" })
  title: string;
}
