import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { TImageFile } from '../interface/image.interface';
import { UserService } from '../services/user.service';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import {
  CreateUserInput,
  createUserValidationSchema,
} from '../validations/user.validation';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const file = req.file as TImageFile | undefined;

  const validatedData: CreateUserInput =
    createUserValidationSchema.parse(userData);

  const userDataForDB = {
    ...validatedData,
    followers: validatedData.followers?.map((id) => new Types.ObjectId(id)),
    following: validatedData.following?.map((id) => new Types.ObjectId(id)),
  };

  const result = await UserService.createUserIntodb(userDataForDB, file);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
};
