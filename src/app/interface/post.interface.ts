import { Document, Model, Types } from 'mongoose';
import { TUser } from './user.interface';

export interface IComment {
  user: Types.ObjectId | TUser;
  comment: string;
  createdAt: Date;
  isDeleted: boolean;
}

export interface IPost extends Document {
  title: string;
  name: string;
  image?: string | null;
  description: string;
  author: Types.ObjectId | TUser;
  upvotes: Types.ObjectId[];
  downvotes: Types.ObjectId[];
  comments: IComment[];
  shares: number;
  viewCount: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostModel extends Model<IPost> {
  findByAuthor(authorId: Types.ObjectId): Promise<IPost[]>;
}
