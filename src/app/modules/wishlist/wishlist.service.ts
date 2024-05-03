import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import { IWishlist } from './wishlist.interface';
import { Wishlist } from './wishlist.model';

const addToWishlist = async (wishlistData: IWishlist): Promise<IWishlist> => {
  const { user, book } = wishlistData;
  const books = await Wishlist.find({ user, book });
  if (books.length)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Book already exists in wishlist',
    );
  const result = await Wishlist.create(wishlistData);
  return result;
};

const getAllWishlist = async (id: string) => {
  const result = await Wishlist.find({ user: id }).populate('book').exec();
  return result;
};
const deleteWishlist = async (id: string): Promise<IWishlist | null> => {
  const _id = id;
  const result = await Wishlist.findByIdAndDelete(_id);
  console.log(result);
  return result;
};

export const WishlistService = {
  addToWishlist,
  getAllWishlist,

  deleteWishlist,
};
