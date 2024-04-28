/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  image: string;
  createdBy: Types.ObjectId | IUser;
  comments: Array<{
    text: string;
  }>;
};

export type IBookFilters = {
  searchTerm?: string;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
// export type ICowFilters = {
//   searchTerm?: string;
// };
