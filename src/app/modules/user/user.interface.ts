import { Model } from 'mongoose';
import { USER_ROLE } from './user.constants';

export type TUserRole = keyof typeof USER_ROLE;

export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: TUserRole;
  //   passwordChangedAt?: Date;
}

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
