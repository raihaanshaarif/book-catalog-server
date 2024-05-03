import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IWishlist } from './wishlist.interface';
import { WishlistService } from './wishlist.service';

const addToWishlist: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const wishlistData = req.body;
    const result = await WishlistService.addToWishlist(wishlistData);

    sendResponse<IWishlist>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Added to wishlist successfully!',
      data: result,
    });
  },
);

const getAllWishlist = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await WishlistService.getAllWishlist(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'wishlist retrieved successfully !',
    data: result,
  });
});

const deleteWishlist = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  // console.log(id);

  const result = await WishlistService.deleteWishlist(id);

  sendResponse<IWishlist>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'wishlist deleted successfully !',
    data: result,
  });
});

export const WishlistController = {
  addToWishlist,
  getAllWishlist,
  deleteWishlist,
};
