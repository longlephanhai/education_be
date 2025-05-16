import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateQuestionpartsixDto {
    @IsNotEmpty({ message: "PartSixId không được bỏ trống" })
    partSixId: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({ message: "QuestionNumber không được bỏ trống" })
    questionNumber: string;

    @IsNotEmpty({ message: "CorrectAnswer không được bỏ trống" })
    correctAnswer: string;
}
