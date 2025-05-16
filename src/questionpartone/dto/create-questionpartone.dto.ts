import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateQuestionpartoneDto {
  @IsNotEmpty({ message: "PartOneId không được bỏ trống" })
  partOneId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: "QuestionNumber không được bỏ trống" })
  questionNumber: string;

  @IsNotEmpty({ message: "CorrectAnswer không được bỏ trống" })
  correctAnswer: string;
}
