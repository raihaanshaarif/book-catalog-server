import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import { IReadinglist } from './readinglist.interface';
import { Readinglist } from './readinglist.model';

const addToReadinglist = async (
  readinglistData: IReadinglist,
): Promise<IReadinglist> => {
  const { user, book } = readinglistData;
  const books = await Readinglist.find({ user, book });
  if (books.length)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Book already exists in Readinglist',
    );
  const result = await Readinglist.create(readinglistData);
  return result;
};

const getAllReadinglist = async (id: string) => {
  const result = await Readinglist.find({ user: id }).populate('book').exec();
  return result;
};

const updateReadinglist = async (
  id: string,
  payload: Partial<IReadinglist>,
): Promise<IReadinglist | null> => {
  const isExist = await Readinglist.findOne({ _id: id });

  // console.log('id', id, 'Payload', payload);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  const { ...readinglistData } = payload;
  const updatedBookData = { ...readinglistData };

  // dynamically handling

  const result = await Readinglist.findOneAndUpdate(
    { _id: id },
    updatedBookData,
    {
      new: true,
    },
  );

  return result;
};
const deleteReadinglist = async (id: string): Promise<IReadinglist | null> => {
  const _id = id;
  const result = await Readinglist.findByIdAndDelete(_id);
  console.log(result);
  return result;
};

export const ReadinglistService = {
  addToReadinglist,
  getAllReadinglist,
  updateReadinglist,
  deleteReadinglist,
};
