import { TUser } from './user.interface';
import { User } from './user.model';

const getUserFromDB = async (email: string) => {
  const result = await User.findOne({ email: email });
  return result;
};

export const UserServices = {
  getUserFromDB,
};
