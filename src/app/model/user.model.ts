import bcrypt from 'bcrypt';
import mongoose, { model, Schema } from 'mongoose';
import config from '../config';
import { TUser, UserModel } from '../interface/user.interface';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
    isPremium: { type: Boolean, default: false },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followerCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  const user = this; // Document

  // Hash the password before saving
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds)
    );
  }

  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = ''; // Remove password from the document
  next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await this.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
