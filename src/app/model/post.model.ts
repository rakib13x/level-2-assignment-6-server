import mongoose, { Schema } from 'mongoose';
import { IComment, IPost, PostModel } from '../interface/post.interface';

const CommentSchema = new Schema<IComment>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comment: {
      type: String,
      required: true,
      maxlength: 500,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    image: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 2000,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    downvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [CommentSchema],
    shares: {
      type: Number,
      default: 0,
      min: 0,
    },
    viewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

PostSchema.index({ upvotes: 1 });
PostSchema.index({ downvotes: 1 });

PostSchema.statics.findByAuthor = function (authorId: mongoose.Types.ObjectId) {
  return this.find({ author: authorId, isDeleted: false });
};

export const Post = mongoose.model<IPost, PostModel>('Post', PostSchema);
