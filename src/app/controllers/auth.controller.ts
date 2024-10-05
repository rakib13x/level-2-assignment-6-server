import httpStatus from 'http-status';
import { AuthServices } from '../services/auth.service';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';

const loginUser = catchAsync(async (req, res) => {
  const { user, accessToken } = await AuthServices.loginUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      profilePhoto: user.profilePhoto, // Include profilePhoto
      status: user.status, // Include status
      followerCount: user.followerCount, // Include followerCount and followingCount
      followingCount: user.followingCount,
      followers: user.followers, // Include followers and following arrays
      following: user.following,
      isPremium: user.isPremium, // Include isPremium
      createdAt: user.createdAt, // Add the timestamps
      updatedAt: user.updatedAt,
    },
    token: accessToken,
  });
});

export const AuthControllers = {
  loginUser,
};
