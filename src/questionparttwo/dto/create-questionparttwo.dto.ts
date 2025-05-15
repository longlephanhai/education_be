import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateQuestionparttwoDto {
  @IsNotEmpty({ message: "PartTwoId không được bỏ trống" })
  partTwoId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: "QuestionNumber không được bỏ trống" })
  questionNumber: string;

  @IsNotEmpty({ message: "CorrectAnswer không được bỏ trống" })
  correctAnswer: string;
}
