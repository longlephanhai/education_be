/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import slug from 'mongoose-slug-updater';
import { PartThree } from 'src/partThree/schema/partThree.schema';

mongoose.plugin(slug);

export type QuestionPartThreeDocument = HydratedDocument<QuestionPartThree>;

@Schema({ timestamps: true })
export class QuestionPartThree {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PartThree' })
  partThreeId: mongoose.Schema.Types.ObjectId;

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

export const QuestionPartThreeSchema = SchemaFactory.createForClass(QuestionPartThree);