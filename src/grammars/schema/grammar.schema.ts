/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import slug from 'mongoose-slug-updater';

mongoose.plugin(slug);

export type GrammarDocument = HydratedDocument<Grammar>;

@Schema({ timestamps: true })
export class Grammar {
  @Prop({ required: true })
  title: string

  @Prop({ slug: 'title', unique: true })
  slug: string;

  @Prop({ required: true })
  content: string;

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

export const GrammarSchema = SchemaFactory.createForClass(Grammar);