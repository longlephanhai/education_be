/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";


export class CreateUserDto {
  @IsNotEmpty({ message: 'Email ko dc de trong', })
  @IsEmail({}, { message: 'Email ko dung dinh dang', })
  email: string;

  @IsNotEmpty({ message: 'Mật khẩu ko dc de trong', })
  password: string;

  @IsOptional()
  name: string;

}
