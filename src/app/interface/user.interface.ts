import { Model, Types } from 'mongoose';
import { USER_ROLE } from '../constants/user.constant';

export interface TUser {
  name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
  phone: string;
  address: string;
  profilePhoto: string | null;
  status: 'active' | 'blocked';
  isPremium: boolean;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  followerCount: number;
  followingCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
