/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

export class CreateRoleDto {
  @IsNotEmpty({ message: 'Tên nhóm quyền không được để trống' })
  title: string;
  @IsNotEmpty({ message: 'Mô tả nhóm quyền không được để trống' })
  description: string;
}
