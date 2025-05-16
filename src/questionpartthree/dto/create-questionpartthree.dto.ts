import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateQuestionpartthreeDto {
  @IsNotEmpty({ message: "PartThreeId không được bỏ trống" })
  partThreeId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: "QuestionNumber không được bỏ trống" })
  questionNumber: string;

  @IsNotEmpty({ message: "CorrectAnswer không được bỏ trống" })
  correctAnswer: string;
}
