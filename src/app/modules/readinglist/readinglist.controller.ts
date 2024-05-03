import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IReadinglist } from './readinglist.interface';
import { ReadinglistService } from './readinglist.service';

const addToReadinglist: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const readinglistData = req.body;
    // console.log(readinglistData);
    const result = await ReadinglistService.addToReadinglist(readinglistData);

    sendResponse<IReadinglist>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Added to Readinglist successfully!',
      data: result,
    });
  },
);

const getAllReadinglist = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ReadinglistService.getAllReadinglist(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Readinglist retrieved successfully !',
    data: result,
  });
});

const updateReadinglist = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  // console.log(id, payload);

  const result = await ReadinglistService.updateReadinglist(id, payload);
  sendResponse<IReadinglist>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Readinglist updated successfully !',
    data: result,
  });
});

const deleteReadinglist = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  // console.log(id);

  const result = await ReadinglistService.deleteReadinglist(id);

  sendResponse<IReadinglist>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Readinglist deleted successfully !',
    data: result,
  });
});

export const ReadinglistController = {
  addToReadinglist,
  getAllReadinglist,
  updateReadinglist,
  deleteReadinglist,
};
