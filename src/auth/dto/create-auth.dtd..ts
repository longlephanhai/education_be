/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional } from "class-validator";

/* eslint-disable prettier/prettier */
export class CreateAuthDto {
  @IsOptional()
  name: string;
  @IsNotEmpty({ message: 'Email không duoc de trong' })
  email: string;
  @IsNotEmpty({ message: 'Password không duoc de trong' })
  password: string;
  @IsOptional()
  avatar: string;
  @IsOptional()
  phone: string;
  @IsOptional()
  status: string;
}

export class CodeAuthDto {
  @IsNotEmpty({ message: 'Id không duoc de trong' })
  _id: string;
  @IsNotEmpty({ message: 'Code không duoc de trong' })
  code: string;
}

export class ChangePasswordDto {
  @IsNotEmpty({ message: 'code không duoc de trong' })
  code: string;
  @IsNotEmpty({ message: 'password không duoc de trong' })
  password: string;
  @IsNotEmpty({ message: 'confirmPassword không duoc de trong' })
  confirmPassword: string;
  @IsNotEmpty({ message: 'email không duoc de trong' })
  email: string;
}
