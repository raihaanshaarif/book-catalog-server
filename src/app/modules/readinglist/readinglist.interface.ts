import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { IBook } from '../book/book.interface';

export type IReadinglist = {
  user?: Types.ObjectId | IUser;
  book?: Types.ObjectId | IBook;
  isCompleted?: boolean;
};

export type ReadinglistModel = Model<IReadinglist, Record<string, unknown>>;
