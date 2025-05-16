/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import slug from 'mongoose-slug-updater';
mongoose.plugin(slug);

export type QuestionPartOneDocument = HydratedDocument<QuestionPartOne>;

@Schema({ timestamps: true })
export class QuestionPartOne {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PartOne' })
  partOneId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  questionNumber: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  correctAnswer: string;

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

export const QuestionPartOneSchema = SchemaFactory.createForClass(QuestionPartOne);