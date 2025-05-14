/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";
export class CreateFavouriteDto {
  @IsNotEmpty({ message: 'id từ không được để trống' })
  vocbId: mongoose.Schema.Types.ObjectId;
}
