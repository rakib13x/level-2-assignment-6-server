import mongoose from 'mongoose';
import { z } from 'zod';

export const createPostValidationSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title must be at least 5 characters long!' })
    .max(100, { message: 'Title cannot exceed 100 characters!' }),
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long!' })
    .max(50, { message: 'Name cannot exceed 50 characters!' }),
  image: z
    .string()
    .url({ message: 'Image must be a valid URL!' })
    .optional()
    .nullable(),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long!' })
    .max(2000, { message: 'Description cannot exceed 2000 characters!' }),
  author: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid author ID!',
  }),
});

export const updatePostValidationSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title must be at least 5 characters long!' })
    .max(100, { message: 'Title cannot exceed 100 characters!' })
    .optional(),
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long!' })
    .max(50, { message: 'Name cannot exceed 50 characters!' })
    .optional(),
  image: z
    .string()
    .url({ message: 'Image must be a valid URL!' })
    .optional()
    .nullable(),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long!' })
    .max(2000, { message: 'Description cannot exceed 2000 characters!' })
    .optional(),
});

export const addCommentValidationSchema = z.object({
  userId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid user ID!',
  }),
  comment: z
    .string()
    .min(1, { message: 'Comment cannot be empty!' })
    .max(500, { message: 'Comment cannot exceed 500 characters!' }),
});

export const voteValidationSchema = z.object({
  userId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid user ID!',
  }),
});

export const softDeleteValidationSchema = z.object({
  userId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid user ID!',
  }),
});
