import { Types } from 'mongoose';

export interface IPost {
  _id: Types.ObjectId;
  title: string;
  name: string;
  image: string | null;
  description: string;
  author: Types.ObjectId;
  upvotes: Types.ObjectId[];
  downvotes: Types.ObjectId[];
  comments: Types.ObjectId[];
  shares: number;
  viewCount: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
