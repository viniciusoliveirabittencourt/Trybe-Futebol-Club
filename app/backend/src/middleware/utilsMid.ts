import { Request, Response, NextFunction } from 'express';
import JWT from '../utils/JWT';

const validToke = async (req: Request, res: Response, next: NextFunction)
: Promise<Response | void> => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).send({ message: 'Token not found!' });
  }

  const user = JWT.readJwt(authorization);

  if (!user || typeof user === 'string') {
    return res.status(401).send({ message: 'Token must be a valid token' });
  }

  req.headers.user = user.data.role;

  next();
};

export default {
  validToke,
};
