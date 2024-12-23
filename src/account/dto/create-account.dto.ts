/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty } from "class-validator";

/* eslint-disable prettier/prettier */
export class CreateAccountDto {
  @IsNotEmpty({ message: "Email không được để trống" })
  @IsEmail({}, { message: "Email không đúng định dạng" })
  email: string;
  
  @IsNotEmpty({ message: "Mật khẩu không được để trống" })
  password: string;

  @IsNotEmpty({ message: "Họ tên không được để trống" })
  fullName: string;
}
