import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateQuestionpartfourDto {
  @IsNotEmpty({ message: "PartFourId không được bỏ trống" })
  partFourId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: "QuestionNumber không được bỏ trống" })
  questionNumber: string;

  @IsNotEmpty({ message: "CorrectAnswer không được bỏ trống" })
  correctAnswer: string;
}
