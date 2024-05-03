import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { IBook } from '../book/book.interface';

export type IWishlist = {
  user: Types.ObjectId | IUser;
  book: Types.ObjectId | IBook;
};

export type WishlistModel = Model<IWishlist, Record<string, unknown>>;
