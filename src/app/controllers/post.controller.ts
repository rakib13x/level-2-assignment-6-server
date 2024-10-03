import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { TImageFile } from '../interface/image.interface';
import { IPost } from '../interface/post.interface';
import { PostService } from '../services/post.service';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import {
  CreateCommentInput,
  createCommentValidationSchema,
} from '../validations/comment.validation';
import {
  CreatePostInput,
  UpdateCommentInput,
  UpdatePostInput,
  VoteInput,
  createPostValidationSchema,
  updateCommentValidationSchema,
  updatePostValidationSchema,
  voteValidationSchema,
} from '../validations/post.validation';

const addPost = catchAsync(async (req: Request, res: Response) => {
  const postData = req.body;
  const file = req.file as TImageFile | undefined;

  const validatedData: CreatePostInput =
    createPostValidationSchema.parse(postData);

  const postDataForDB = {
    ...validatedData,
    author: new Types.ObjectId(validatedData.author),
  };

  const result = await PostService.addPost(postDataForDB, file);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Post created successfully',
    data: result,
  });
});

const editPost = catchAsync(async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const updateData = req.body;
  const file = req.file as TImageFile | undefined;

  const validatedData: UpdatePostInput =
    updatePostValidationSchema.parse(updateData);

  const postDataForDB: Partial<IPost> = {
    ...validatedData,
    author: validatedData.author
      ? new Types.ObjectId(validatedData.author)
      : undefined,
  };

  const result = await PostService.editPost(postId, postDataForDB, file);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Post updated successfully',
    data: result,
  });
});

const deletePost = catchAsync(async (req: Request, res: Response) => {
  const postId = req.params.postId;

  const result = await PostService.deletePost(postId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Post deleted successfully',
    data: result,
  });
});

const addComment = catchAsync(async (req: Request, res: Response) => {
  const commentData = req.body;

  const validatedData: CreateCommentInput =
    createCommentValidationSchema.parse(commentData);

  const commentDataForDB = {
    ...validatedData,
    user: new Types.ObjectId(validatedData.user),
    post: new Types.ObjectId(validatedData.post),
  };

  const result = await PostService.addComment(commentDataForDB);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Comment added successfully',
    data: result,
  });
});

const updateComment = catchAsync(async (req: Request, res: Response) => {
  const commentId = req.params.commentId;
  const updateData = req.body;

  const validatedData: UpdateCommentInput =
    updateCommentValidationSchema.parse(updateData);

  const result = await PostService.updateComment(commentId, validatedData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Comment updated successfully',
    data: result,
  });
});

const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const commentId = req.params.commentId;

  const result = await PostService.deleteComment(commentId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Comment deleted successfully',
    data: result,
  });
});

const upvotePost = catchAsync(async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const voteData = req.body;

  const validatedData: VoteInput = voteValidationSchema.parse(voteData);

  const result = await PostService.upvotePost(postId, validatedData.userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Post upvoted successfully',
    data: result,
  });
});

const downvotePost = catchAsync(async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const voteData = req.body;

  const validatedData: VoteInput = voteValidationSchema.parse(voteData);

  const result = await PostService.downvotePost(postId, validatedData.userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Post downvoted successfully',
    data: result,
  });
});

export const PostController = {
  addPost,
  editPost,
  deletePost,
  addComment,
  updateComment,
  deleteComment,
  upvotePost,
  downvotePost,
};
