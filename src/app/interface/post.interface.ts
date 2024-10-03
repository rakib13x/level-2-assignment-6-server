import { Model, Types } from 'mongoose';
import { TUser } from './user.interface';

export interface IComment {
  user: Types.ObjectId | TUser;
  comment: string;
  createdAt: Date;
}

export interface IPost {
  title: string;
  name: string;
  image?: string;
  description: string;
  author: Types.ObjectId | TUser;
  upvotes: Types.ObjectId[];
  downvotes: Types.ObjectId[];
  comments: IComment[];
  shares: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostModel extends Model<IPost> {}
