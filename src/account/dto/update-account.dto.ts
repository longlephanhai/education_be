/* eslint-disable prettier/prettier */
import { OmitType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './create-account.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateAccountDto extends OmitType(CreateAccountDto, ['password'] as const) {
  @IsNotEmpty({ message: '_id không được bỏ trống' })
  _id: string;
}
