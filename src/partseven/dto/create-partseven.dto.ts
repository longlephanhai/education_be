import { IsNotEmpty } from "class-validator";

export class CreatePartsevenDto {
    @IsNotEmpty({ message: 'Tên bộ đề không được để trống' })
    name: string;

    @IsNotEmpty({ message: 'Miêu tả không được để trống' })
    description: string;
}
