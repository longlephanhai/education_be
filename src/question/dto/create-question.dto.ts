/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateQuestionDto {
  @IsNotEmpty({ message: "ExamId không được bỏ trống" })
  examId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: "Part không được bỏ trống" })
  part: string;

  @IsNotEmpty({ message: "QuestionNumber không được bỏ trống" })
  questionNumber: string;

  @IsNotEmpty({ message: "CorrectAnswer không được bỏ trống" })
  correctAnswer: string;
}
