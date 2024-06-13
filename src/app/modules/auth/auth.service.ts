import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import { TLoginUser } from './auth.interface';
import { User } from '../user/user.model';
import { createJwtToken } from './auth.utils';
import config from '../../config';

const signUp = async (payload: TUser) => {
  const userExists = await User.isUserExistsByEmail(payload.email);

  if (userExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exists');
  }

  const result = await User.create(payload);
  return result;
};

const login = async (payload: TLoginUser) => {
  //   console.log(payload);
  const userExists = await User.isUserExistsByEmail(payload.email);

  if (!userExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exists');
  }

  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    userExists.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Password does not match!');
  }
  // console.log(userExists);
  const jwtPayload = {
    userEmail: userExists.email,
    // id: userExists._id,
    role: userExists.role,
  };

  const accessToken = createJwtToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  // console.log(accessToken);
  const refreshToken = createJwtToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );
  return {
    accessToken,
    refreshToken,
    userExists,
  };
};

export const AuthServices = {
  signUp,
  login,
};
