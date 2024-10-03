import express from 'express';
import { PostController } from '../../controllers/post.controller';
import validateRequest from '../../middlewares/validateRequest';
import {
  addCommentValidationSchema,
  updateCommentValidationSchema,
} from '../../validations/post.validation';

const router = express.Router();

router.post(
  '/:postId/comments',
  validateRequest(addCommentValidationSchema),
  PostController.addComment
);

router.put(
  '/:commentId',
  validateRequest(updateCommentValidationSchema),
  PostController.updateComment
);

router.delete('/:commentId', PostController.deleteComment);

export const CommentRoutes = router;
