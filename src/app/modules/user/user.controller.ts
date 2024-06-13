import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import config from '../../config';

const getUser = catchAsync(async (req, res) => {
  const authToken = req.headers.authorization;
  const token = authToken?.split(' ')[1];
  console.log(authToken);
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }
  console.log('Token===', token);

  console.log('new===', config.jwt_access_secret);

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const { userEmail, role } = decoded;

  const result = await UserServices.getUserFromDB(userEmail);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

export const UserControllers = {
  getUser,
};
