import { Types } from 'mongoose';

export interface IComment {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  post: Types.ObjectId;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
