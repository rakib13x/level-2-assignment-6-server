import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { TLoginUser } from '../interface/auth.interface';
import { TUser } from '../interface/user.interface';
import { User } from '../model/user.model';

const loginUser = async (payload: TLoginUser) => {
  // Check if user exists by email
  const user = (await User.isUserExistsByEmail(payload?.email)) as TUser & {
    _id: string;
  };

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user does not exist!');
  }

  // Validate password
  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match.');
  }

  // Include all necessary fields in the JWT payload
  const jwtPayload = {
    _id: user._id,
    userEmail: user.email,
    customerName: user.name,
    customerPhone: user.phone,
    role: user.role,
  };

  // Sign the JWT with the required fields
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  // Return the full user data and token
  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      status: user.status,
      profilePhoto: user.profilePhoto, // Include the profilePhoto here
      followerCount: user.followerCount, // Add these fields
      followingCount: user.followingCount,
      createdAt: user.createdAt, // Add the timestamps
      updatedAt: user.updatedAt,
      isPremium: user.isPremium, // Include isPremium
      followers: user.followers, // Include followers/following arrays
      following: user.following,
    },
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
};
