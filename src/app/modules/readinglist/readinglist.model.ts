import { Schema, model } from 'mongoose';
import { IReadinglist } from './readinglist.interface';

const readinglistSchema = new Schema<IReadinglist>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
    },
    isCompleted: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Readinglist = model<IReadinglist>(
  'Readinglist',
  readinglistSchema,
);
