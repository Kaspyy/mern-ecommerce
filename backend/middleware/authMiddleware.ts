import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

interface JwtPayload {
  id: string;
}

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    )
      try {
        token = req.headers.authorization.split(' ')[1];

        const { id } = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as JwtPayload;

        req.user = (await User.findById(id)) as Record<string, any>;

        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error('Not authorized, token failed');
      }

    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token provided');
    }
  }
);

const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized, not an admin');
  }
};

export { protect, admin };
