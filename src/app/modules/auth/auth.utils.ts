import jwt from 'jsonwebtoken';

export const createJwtToken = (
  jwtPayload: { userEmail: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn });
};
