import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import { USER_ROLE } from './user.constants';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      //   select: false,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      required: [true, 'Role is required'],
    },
    // passwordChangedAt: {
    //   type: Date,
    // },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  },
);

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email });
};

userSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const User = model<TUser, UserModel>('user', userSchema);
