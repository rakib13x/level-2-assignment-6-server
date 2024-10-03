import express from 'express';
import { multerUpload } from '../../config/multer.config';
import { UserController } from '../../controllers/user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createUserValidationSchema } from '../../validations/user.validation';

const router = express.Router();

router.post(
  '/',
  multerUpload.single('profilePhoto'),
  validateRequest(createUserValidationSchema),
  UserController.createUser
);

export const UserRoutes = router;
