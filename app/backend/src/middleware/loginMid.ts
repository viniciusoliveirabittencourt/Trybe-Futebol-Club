import { Request, Response, NextFunction } from 'express';
import JWT from '../utils/JWT';
import { IUser } from '../interface/login.interface';

export default class loginMid {
  private validMethod = (method: string): boolean | void => {
    if (!method || typeof method !== 'string') {
      return true;
    }
  };

  public validLoginBody = async (req: Request, res: Response, next: NextFunction)
  : Promise<Response | void> => {
    const { email, password }: IUser = req.body;

    if (this.validMethod(email) || this.validMethod(password)) {
      return res.status(400).send({ message: 'All fields must be filled' });
    }

    next();
  };

  static getRole = (req: Request, res: Response, next: NextFunction) => {
    const toke: string | undefined = req.headers.authorization;

    if (!toke) {
      return res.status(400).send({ message: 'Token not found!' });
    }

    const decodToke = JWT.readJwt(toke);

    if (!decodToke || typeof decodToke === 'string') {
      return res.status(400).send({ message: 'Invalid Token' });
    }

    req.headers.user = decodToke.data.role;

    next();
  };
}
