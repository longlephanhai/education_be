import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateScoreDto {
    @IsNotEmpty({ message: 'Điểm không được để trống' })
    score: number;
    @IsNotEmpty({ message: 'Người dùng không được để trống' })
    userId: mongoose.Schema.Types.ObjectId;
    @IsNotEmpty({ message: 'Bài thi không được để trống' })
    examId: mongoose.Schema.Types.ObjectId;
    @IsNotEmpty({ message: 'Câu trả lời đúng không được để trống' })
    correctAnswers: String;
    @IsNotEmpty({ message: 'Câu trả lời sai không được để trống' })
    incorrectAnswers: String;
}
