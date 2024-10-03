import { Types } from 'mongoose';
import { cloudinaryUpload } from '../config/cloudinary.config';
import { IComment } from '../interface/comment.interface';
import { TImageFile } from '../interface/image.interface';
import { IPost } from '../interface/post.interface';
import { Comment } from '../model/comment.model';
import { Post } from '../model/post.model';

const addPost = async (
  postData: Partial<IPost>,
  file?: TImageFile
): Promise<IPost> => {
  let image = null;
  if (file) {
    const result = await cloudinaryUpload.uploader.upload(file.path);
    image = result.secure_url;
  }

  const newPost = await Post.create({
    ...postData,
    image,
  });

  return newPost;
};

const editPost = async (
  postId: string,
  updateData: Partial<IPost>,
  file?: TImageFile
): Promise<IPost | null> => {
  if (file) {
    const result = await cloudinaryUpload.uploader.upload(file.path);
    updateData.image = result.secure_url;
  }

  const updatedPost = await Post.findByIdAndUpdate(postId, updateData, {
    new: true,
  });
  return updatedPost;
};

const deletePost = async (postId: string): Promise<IPost | null> => {
  const deletedPost = await Post.findByIdAndUpdate(
    postId,
    { isDeleted: true },
    { new: true }
  );
  return deletedPost;
};

const addComment = async (
  commentData: Partial<IComment>
): Promise<IComment> => {
  const newComment = await Comment.create(commentData);
  await Post.findByIdAndUpdate(commentData.post, {
    $push: { comments: newComment._id },
  });
  return newComment;
};

const updateComment = async (
  commentId: string,
  updateData: Partial<IComment>
): Promise<IComment | null> => {
  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    updateData,
    { new: true }
  );
  return updatedComment;
};

const deleteComment = async (commentId: string): Promise<IComment | null> => {
  const deletedComment = await Comment.findByIdAndUpdate(
    commentId,
    { isDeleted: true },
    { new: true }
  );
  return deletedComment;
};

const upvotePost = async (
  postId: string,
  userId: string
): Promise<IPost | null> => {
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      $addToSet: { upvotes: new Types.ObjectId(userId) },
      $pull: { downvotes: new Types.ObjectId(userId) },
    },
    { new: true }
  );
  return updatedPost;
};

const downvotePost = async (
  postId: string,
  userId: string
): Promise<IPost | null> => {
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      $addToSet: { downvotes: new Types.ObjectId(userId) },
      $pull: { upvotes: new Types.ObjectId(userId) },
    },
    { new: true }
  );
  return updatedPost;
};

export const PostService = {
  addPost,
  editPost,
  deletePost,
  addComment,
  updateComment,
  deleteComment,
  upvotePost,
  downvotePost,
};
