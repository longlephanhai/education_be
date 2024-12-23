/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

export class CreateAboutusDto {
    @IsNotEmpty({ message: 'Nội dung không được để trống' })
    content: string;
}
