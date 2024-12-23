/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
export class CreateVocabularyDto {
  @IsNotEmpty({ message: 'Tiêu đề không được để trống' })
  title: string

  @IsNotEmpty({ message: 'Từ vựng không được để trống' })
  vocb: string;

  @IsNotEmpty({ message: 'Nghĩa không được để trống' })
  meaning: string;

  @IsNotEmpty({ message: 'Ví dụ không được để trống' })
  example: string;

  @IsNotEmpty({ message: 'Loại từ không được để trống' })
  type: string;

  @IsNotEmpty({ message: 'Danh mục không được để trống' })
  category: string;

  @IsNotEmpty({ message: 'Cấp độ không được để trống' })
  level: string;

  @IsNotEmpty({ message: 'Phát âm không được để trống' })
  pronounce: string;

}
