import { NextFunction, Request, Response } from 'express';
import { User } from '../model/user.model';

export const checkPremium = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user.id;
  const user = await User.findById(userId);

  if (!user || !user.isPremium) {
    return res.status(403).json({
      message: 'Access denied. You need to have a premium subscription.',
    });
  }

  next();
};
