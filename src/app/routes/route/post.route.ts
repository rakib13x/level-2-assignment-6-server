import express from 'express';
import { multerUpload } from '../../config/multer.config';
import { PostController } from '../../controllers/post.controller';
import validateRequest from '../../middlewares/validateRequest';
import {
  createPostValidationSchema,
  updatePostValidationSchema,
} from '../../validations/post.validation';

const router = express.Router();

router.post(
  '/',
  multerUpload.single('image'),
  validateRequest(createPostValidationSchema),
  PostController.addPost
);

router.put(
  '/:postId',
  multerUpload.single('image'),
  validateRequest(updatePostValidationSchema),
  PostController.editPost
);

router.delete('/:postId', PostController.deletePost);

router.post('/:postId/upvote', PostController.upvotePost);

router.post('/:postId/downvote', PostController.downvotePost);

export const PostRoutes = router;
