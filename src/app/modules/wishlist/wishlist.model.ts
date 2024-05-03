import { Schema, model } from 'mongoose';
import { IWishlist } from './wishlist.interface';

const wishlistSchema = new Schema<IWishlist>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Wishlist = model<IWishlist>('Wishlist', wishlistSchema);
