/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import slug from 'mongoose-slug-updater';

mongoose.plugin(slug);

export type VocabularyDocument = HydratedDocument<Vocabulary>;

@Schema({ timestamps: true })
export class Vocabulary {
  @Prop({ required: true })
  title: string

  @Prop({ slug: 'title' })
  slug: string;

  @Prop({ required: true })
  vocb: string;

  @Prop({ required: true })
  meaning: string;

  @Prop({ required: true })
  example: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  pronounce: string;

  @Prop({ required: true })
  img: string;

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

export const VocabularySchema = SchemaFactory.createForClass(Vocabulary);