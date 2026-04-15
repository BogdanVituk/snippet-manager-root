import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SnippetDocument = HydratedDocument<Snippet>;


export enum SnippetType {
  LINK = 'link',
  NOTE = 'note',
  COMMAND = 'command',
}

@Schema({ 
  timestamps: true, 
  versionKey: false 
})
export class Snippet {
  @Prop({ 
    required: true, 
    trim: true,
    index: true 
   })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ 
    type: String, 
    enum: SnippetType, 
    required: true
  })
  type: SnippetType;

  
  createdAt: Date;
  updatedAt: Date;
}

export const SnippetSchema = SchemaFactory.createForClass(Snippet);