import { z } from 'zod';

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required!',
    }),

    author: z.string({
      required_error: 'author number is required!',
    }),
    genre: z.string({
      required_error: 'genre number is required!',
    }),
    publicationDate: z.string({
      required_error: 'publicationDate number is required!',
    }),
    image: z.string({
      required_error: 'publicationDate number is required!',
    }),
    comments: z.array(z.string()).default([]),
    createdBy: z.string({
      required_error: 'Created by number is required!',
    }),
  }),
});
const updateBookZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'title is required!',
      })
      .optional(),

    author: z
      .string({
        required_error: 'author number is required!',
      })
      .optional(),
    genre: z
      .string({
        required_error: 'genre number is required!',
      })
      .optional(),
    publicationDate: z
      .string({
        required_error: 'publicationDate number is required!',
      })
      .optional(),
    image: z
      .string({
        required_error: 'publicationDate number is required!',
      })
      .optional(),
    createdBy: z
      .string({
        required_error: 'Created by number is required!',
      })
      .optional(),
  }),
});

export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
};
