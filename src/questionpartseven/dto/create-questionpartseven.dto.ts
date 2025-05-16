import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateQuestionpartsevenDto {
    @IsNotEmpty({ message: "PartSevenId không được bỏ trống" })
    partSevenId: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({ message: "QuestionNumber không được bỏ trống" })
    questionNumber: string;

    @IsNotEmpty({ message: "CorrectAnswer không được bỏ trống" })
    correctAnswer: string;
}
