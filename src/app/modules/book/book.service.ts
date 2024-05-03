import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../interfaces/common';
import { IPaginationOptions } from '../../interfaces/pagination';
import { bookSearchableFields } from './book.constant';
import { IBook, IBookFilters } from './book.interface';
import { Book } from './book.model';
import ApiError from '../../../errors/apiError';
import httpStatus from 'http-status';

const createBook = async (bookData: IBook): Promise<IBook> => {
  console.log(bookData);
  const result = await Book.create(bookData);
  return result;
};

const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Book.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id);
  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<IBook>,
): Promise<IBook | null> => {
  const isExist = await Book.findOne({ _id: id });

  console.log('id', id, 'Payload', payload);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  const { ...bookData } = payload;
  const updatedBookData = { ...bookData };

  // dynamically handling

  const result = await Book.findOneAndUpdate({ _id: id }, updatedBookData, {
    new: true,
  });

  return result;
};
const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete(id);
  return result;
};

const createComment = async (bookId: string, commentData: string) => {
  console.log('test', commentData);
  const result = await Book.findOneAndUpdate(
    { _id: bookId },
    { $push: { comments: commentData } },
  );
  console.log(result);
  return result;
};

const getComment = async (id: string): Promise<IBook | null> => {
  const result = await Book.findOne(
    { _id: id },
    'comments -_id', // Includes comments, excludes _id
  ).exec(); // Ensuring to execute and return a promise

  console.log(result);
  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  createComment,
  getComment,
};
