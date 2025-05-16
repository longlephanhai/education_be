import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateQuestionpartfiveDto {
    @IsNotEmpty({ message: "PartFiveId không được bỏ trống" })
    partFiveId: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({ message: "QuestionNumber không được bỏ trống" })
    questionNumber: string;

    @IsNotEmpty({ message: "CorrectAnswer không được bỏ trống" })
    correctAnswer: string;
}
