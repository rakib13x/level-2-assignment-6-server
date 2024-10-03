import { z } from 'zod';

export const createCommentValidationSchema = z.object({
  user: z.string(),
  post: z.string(),
  comment: z
    .string()
    .min(1, { message: 'Comment cannot be empty!' })
    .max(500, { message: 'Comment cannot exceed 500 characters!' }),
});

export const updateCommentValidationSchema = z.object({
  comment: z
    .string()
    .min(1, { message: 'Comment cannot be empty!' })
    .max(500, { message: 'Comment cannot exceed 500 characters!' }),
});

export type CreateCommentInput = z.infer<typeof createCommentValidationSchema>;
export type UpdateCommentInput = z.infer<typeof updateCommentValidationSchema>;
