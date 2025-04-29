/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Exam } from 'src/exam/schema/exam.schema';
import { User } from 'src/users/schema/user.schema';


export type ScoreDocument = HydratedDocument<Score>;

@Schema({ timestamps: true })
export class Score {
    @Prop()
    score: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    userId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Exam.name })
    examId: mongoose.Schema.Types.ObjectId;

    @Prop()
    correctAnswers: String;
    
    @Prop()
    incorrectAnswers: String;

    @Prop()
    times: number;

    @Prop({ type: Object })
    createdBy: {
        _id: mongoose.Schema.Types.ObjectId,
        email: string,
    };

    @Prop({ type: Object })
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId,
        email: string,
    };

    @Prop({ type: Object })
    deletedBy: {
        _id: mongoose.Schema.Types.ObjectId,
        email: string,
    };

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop()
    isDeleted: boolean;

    @Prop()
    deledtedAt: Date;
}

export const ScoreSchema = SchemaFactory.createForClass(Score);