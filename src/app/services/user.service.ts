import { cloudinaryUpload } from '../config/cloudinary.config';
import { TImageFile } from '../interface/image.interface';
import { TUser } from '../interface/user.interface';
import { User } from '../model/user.model';

const createUserIntodb = async (
  userData: Partial<TUser>,
  file?: TImageFile
): Promise<TUser> => {
  let profilePhoto = null;
  if (file) {
    const result = await cloudinaryUpload.uploader.upload(file.path);
    profilePhoto = result.secure_url;
  }

  const newUser = await User.create({
    ...userData,
    profilePhoto,
  });

  return newUser;
};

export const UserService = {
  createUserIntodb,
};
