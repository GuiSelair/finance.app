import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export const ensureAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const authHeader = request.headers.authorization;
  if (!authHeader) throw new AppError('Authentication Token is missing...', 401);

  const [, token] = authHeader.split(' ');

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw new AppError('Error in token secret', 401);

  try {
    const decoded = verify(token, jwtSecret);
    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };
    return next();
  } catch (err) {
    throw new AppError('Invalid JWT Token...', 401);
  }
};
